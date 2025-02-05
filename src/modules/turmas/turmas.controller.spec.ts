import { Test, TestingModule } from '@nestjs/testing';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';
import { PermissionsService } from '../auth/permissions.service';
import { Role } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { RequestWithUser } from '../auth/request-with-user.interface';

describe('TurmasController', () => {
  let controller: TurmasController;
  let turmasService: TurmasService;
  let permissionsService: PermissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TurmasController],
      providers: [
        {
          provide: TurmasService,
          useValue: {
            createTurma: jest.fn(),
            findAllTurmas: jest.fn(),
            updateTurma: jest.fn(),
            deleteTurma: jest.fn(),
            findProfessorTurmas: jest.fn(),
            findTurmaById: jest.fn(),
            addAlunoToTurma: jest.fn(),
            findAlunosByTurma: jest.fn(),
            findAllAlunos: jest.fn(),
          },
        },
        {
          provide: PermissionsService,
          useValue: {
            canDeleteTurma: jest.fn(),
            canManageOwnTurma: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TurmasController>(TurmasController);
    turmasService = module.get<TurmasService>(TurmasService);
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTurma', () => {
    it('should create a new turma', async () => {
      const createTurmaDto = { name: 'Turma 1', professorId: 1 }; // Exemplo de DTO
      const createdTurma = {
        id: 1,
        name: 'Turma 1',
        professorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(turmasService, 'createTurma').mockResolvedValue(createdTurma);

      const result = await controller.createTurma(createTurmaDto);

      expect(result).toEqual(createdTurma);
    });
  });

  describe('listAllTurmas', () => {
    it('should list all turmas', async () => {
      const turmas = [
        {
          id: 1,
          name: 'Turma 1',
          professorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          professor: {
            id: 1,
            name: 'Professor 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'professor1@example.com',
            password: 'password',
            role: Role.professor,
            turmaId: 1,
          },
          alunos: [
            {
              id: 1,
              name: 'Aluno 1',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'aluno1@example.com',
              password: 'password',
              role: Role.aluno,
              turmaId: 1,
            },
          ],
        },
        {
          id: 2,
          name: 'Turma 2',
          professorId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          professor: {
            id: 2,
            name: 'Professor 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            email: 'professor2@example.com',
            password: 'password',
            role: Role.professor,
            turmaId: 2,
          },
          alunos: [
            {
              id: 2,
              name: 'Aluno 2',
              createdAt: new Date(),
              updatedAt: new Date(),
              email: 'aluno2@example.com',
              password: 'password',
              role: Role.aluno,
              turmaId: 2,
            },
          ],
        },
      ];
      jest.spyOn(turmasService, 'findAllTurmas').mockResolvedValue(turmas);
      const result = await controller.listAllTurmas();

      expect(result).toEqual(turmas);
    });
  });

  describe('editTurma', () => {
    it('should update a turma', async () => {
      const updateTurmaDto = { name: 'Turma Atualizada' };
      const updatedTurma = {
        id: 1,
        name: 'Turma Atualizada',
        professorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(turmasService, 'updateTurma').mockResolvedValue(updatedTurma);

      const result = await controller.editTurma(1, updateTurmaDto);

      expect(result).toEqual(updatedTurma);
    });
  });

  describe('deleteTurma', () => {
    it('should delete a turma if permission granted', async () => {
      const req = {
        user: { role: Role.admin }, // Permissão de admin
      } as RequestWithUser;

      jest
        .spyOn(permissionsService, 'canDeleteTurma')
        .mockImplementation(() => {});
      jest.spyOn(turmasService, 'deleteTurma').mockResolvedValue({
        id: 1,
        name: 'Turma 1',
        professorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await controller.deleteTurma(req, 1);

      expect(result).toEqual({
        id: 1,
        name: 'Turma 1',
        professorId: 1,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        createdAt: expect.any(Date),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        updatedAt: expect.any(Date),
      });
    });

    it('should throw an error if permission denied', async () => {
      const req = {
        user: { role: Role.professor }, // Permissão negada
      } as RequestWithUser;

      jest
        .spyOn(permissionsService, 'canDeleteTurma')
        .mockImplementation(() => {
          throw new Error('Acesso negado');
        });

      await expect(controller.deleteTurma(req, 1)).rejects.toThrowError(
        'Acesso negado',
      );
    });
  });

  describe('addAlunoToTurma', () => {
    it('should add aluno to turma', async () => {
      const alunoDto = { alunoId: 2 };
      const turma = {
        id: 1,
        name: 'Turma 1',
        professorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const alunoAdded = {
        id: 2,
        name: 'Aluno 2',
        professorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(turmasService, 'findTurmaById').mockResolvedValue(turma);
      jest
        .spyOn(permissionsService, 'canManageOwnTurma')
        .mockImplementation(() => {});
      jest
        .spyOn(turmasService, 'addAlunoToTurma')
        .mockResolvedValue(alunoAdded);

      const result = await controller.addAlunoToTurma(1, alunoDto, {
        user: { id: 1, role: 'professor' },
      } as RequestWithUser);

      expect(result).toEqual(alunoAdded);
    });

    it('should throw NotFoundException if turma not found', async () => {
      jest.spyOn(turmasService, 'findTurmaById').mockResolvedValue(null);

      await expect(
        controller.addAlunoToTurma(999, { alunoId: 2 }, {
          user: { id: 1, role: 'professor' },
        } as RequestWithUser),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('listAlunosByTurma', () => {
    it('should list alunos by turma id', async () => {
      const alunos = [
        {
          id: 1,
          name: 'Aluno 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'aluno1@example.com',
          password: 'password',
          role: Role.aluno,
          turmaId: 1,
        },
      ];
      jest.spyOn(turmasService, 'findAlunosByTurma').mockResolvedValue(alunos);

      const result = await controller.listAlunosByTurma(1);

      expect(result).toEqual(alunos);
    });
  });

  describe('listProfessorTurmas', () => {
    it('should return the list of turmas for the logged-in professor', async () => {
      const professorId = 1;
      const turmas = [
        {
          id: 1,
          name: 'Turma 1',
          professorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          alunos: [],
        },
      ];
      jest
        .spyOn(turmasService, 'findProfessorTurmas')
        .mockResolvedValue(turmas);
      jest
        .spyOn(turmasService, 'findProfessorTurmas')
        .mockResolvedValue(turmas);

      const req = { user: { id: professorId } } as RequestWithUser;
      const result = await controller.listProfessorTurmas(req);

      expect(result).toEqual(turmas);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(turmasService.findProfessorTurmas).toHaveBeenCalledWith(professorId);
    });
  });

  describe('listarTodosAlunos', () => {
    it('should return the list of all students', async () => {
      const alunos = [
        {
          id: 1,
          name: 'Aluno 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'aluno1@example.com',
          password: 'password',
          role: Role.aluno,
          turmaId: 1,
        },
      ];
      jest.spyOn(turmasService, 'findAllAlunos').mockResolvedValue(alunos);

      const result = await controller.listarTodosAlunos();

      expect(result).toEqual(alunos);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(turmasService.findAllAlunos).toHaveBeenCalled();
    });
  });
});
