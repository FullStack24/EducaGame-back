import { Test, TestingModule } from '@nestjs/testing';
import { TurmasService } from './turmas.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { createMockPrismaService } from '../../shared/prisma/prisma.service.mock';

describe('TurmasService', () => {
  let service: TurmasService;
  let prisma: ReturnType<typeof createMockPrismaService>;

  beforeEach(async () => {
    prisma = createMockPrismaService();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TurmasService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<TurmasService>(TurmasService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('createTurma', () => {
    it('deve criar uma nova turma', async () => {
      const createMock = {
        id: 1,
        name: 'Nova Turma',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.create.mockResolvedValueOnce(createMock);

      const result = await service.createTurma({
        name: 'Nova Turma',
        professorId: 10,
      });

      expect(result).toEqual(createMock);
      expect(prisma.turma.create).toHaveBeenCalledWith({
        data: { name: 'Nova Turma', professorId: 10 },
      });
    });
  });

  describe('findAllTurmas', () => {
    it('deve listar todas as turmas', async () => {
      const turmasMock = [
        {
          id: 1,
          name: 'Turma 1',
          professor: { id: 10, name: 'Professor 1' },
          alunos: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.turma.findMany.mockResolvedValueOnce(turmasMock);

      const result = await service.findAllTurmas();

      expect(result).toEqual(turmasMock);
      expect(prisma.turma.findMany).toHaveBeenCalledWith({
        include: { professor: true, alunos: true },
      });
    });
  });

  describe('updateTurma', () => {
    it('deve atualizar uma turma existente', async () => {
      const updateMock = {
        id: 1,
        name: 'Turma Atualizada',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(updateMock);
      prisma.turma.update.mockResolvedValueOnce(updateMock);

      const result = await service.updateTurma(1, { name: 'Turma Atualizada' });

      expect(result).toEqual(updateMock);
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.turma.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Turma Atualizada' },
      });
    });

    it('deve lançar um erro ao tentar atualizar uma turma inexistente', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.updateTurma(999, { name: 'Turma Atualizada' }),
      ).rejects.toThrow(Error);
    });
  });

  describe('deleteTurma', () => {
    it('deve deletar uma turma existente', async () => {
      const deleteMock = {
        id: 1,
        name: 'Turma Deletada',
        professorId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(deleteMock);
      prisma.turma.delete.mockResolvedValueOnce(deleteMock);

      const result = await service.deleteTurma(1);

      expect(result).toEqual(deleteMock);
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.turma.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve lançar NotFoundException ao tentar deletar uma turma inexistente', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      await expect(service.deleteTurma(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllAlunos', () => {
    it('deve listar todos os alunos', async () => {
      const alunosMock = [
        { id: 1, name: 'Aluno 1', role: 'aluno', turmaId: 1 },
        { id: 2, name: 'Aluno 2', role: 'aluno', turmaId: 2 },
      ];

      prisma.user.findMany.mockResolvedValueOnce(alunosMock);

      const result = await service.findAllAlunos();

      expect(result).toEqual(alunosMock);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { role: 'aluno' },
      });
    });

    it('deve retornar uma lista vazia se não houver alunos', async () => {
      prisma.user.findMany.mockResolvedValueOnce([]);

      const result = await service.findAllAlunos();

      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { role: 'aluno' },
      });
    });
  });

  describe('findProfessorTurmas', () => {
    it('deve listar todas as turmas de um professor', async () => {
      const professorTurmasMock = [
        {
          id: 1,
          name: 'Turma do Professor 1',
          professorId: 10,
          professor: { id: 10, name: 'Professor 1' },
          alunos: [{ id: 1, name: 'Aluno 1' }],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.turma.findMany.mockResolvedValueOnce(professorTurmasMock);

      const result = await service.findProfessorTurmas(10);

      expect(result).toEqual(professorTurmasMock);
      expect(prisma.turma.findMany).toHaveBeenCalledWith({
        where: { professorId: 10 },
        include: { alunos: true },
      });
    });

    it('deve retornar uma lista vazia se o professor não tiver turmas', async () => {
      prisma.turma.findMany.mockResolvedValueOnce([]);

      const result = await service.findProfessorTurmas(999);

      expect(result).toEqual([]);
      expect(prisma.turma.findMany).toHaveBeenCalledWith({
        where: { professorId: 999 },
        include: { alunos: true },
      });
    });
  });

  describe('addAlunoToTurma', () => {
    it('deve adicionar um aluno à turma', async () => {
      const turmaMock = {
        id: 1,
        name: 'Turma 1',
        professorId: 10,
        alunos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const alunoMock = { id: 2, name: 'Aluno 2', role: 'aluno', turmaId: 1 };

      prisma.turma.findUnique.mockResolvedValueOnce(turmaMock);
      prisma.turma.update.mockResolvedValueOnce({
        ...turmaMock,
        alunos: [alunoMock],
      });

      const result = await service.addAlunoToTurma(1, 2, 10);

      expect(result).toEqual({
        ...turmaMock,
        alunos: [alunoMock],
      });
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.turma.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          alunos: {
            connect: { id: 2 },
          },
        },
      });
    });

    it('deve lançar um erro se a turma não for encontrada', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      await expect(service.addAlunoToTurma(999, 2, 10)).rejects.toThrow(Error);
    });

    it('deve lançar um erro se o professor não for o responsável pela turma', async () => {
      const turmaMock = {
        id: 1,
        name: 'Turma 1',
        professorId: 11,
        alunos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(turmaMock);

      await expect(service.addAlunoToTurma(1, 2, 10)).rejects.toThrow(Error);
    });
  });

  describe('findTurmaById', () => {
    it('deve retornar a turma encontrada pelo id', async () => {
      const turmaMock = {
        id: 1,
        name: 'Turma 1',
        professorId: 10,
        alunos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.turma.findUnique.mockResolvedValueOnce(turmaMock);

      const result = await service.findTurmaById(1);

      expect(result).toEqual(turmaMock);
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve retornar null se a turma não for encontrada', async () => {
      prisma.turma.findUnique.mockResolvedValueOnce(null);

      const result = await service.findTurmaById(999);

      expect(result).toBeNull();
      expect(prisma.turma.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('findAlunosByTurma', () => {
    it('deve retornar uma lista de alunos para uma turma existente', async () => {
      const alunosMock = [
        { id: 1, name: 'Aluno 1', role: 'aluno', turmaId: 1 },
        { id: 2, name: 'Aluno 2', role: 'aluno', turmaId: 1 },
      ];

      prisma.user.findMany.mockResolvedValueOnce(alunosMock);

      const result = await service.findAlunosByTurma(1);

      expect(result).toEqual(alunosMock);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { turmaId: 1, role: 'aluno' },
      });
    });

    it('deve retornar uma lista vazia se não houver alunos na turma', async () => {
      prisma.user.findMany.mockResolvedValueOnce([]);

      const result = await service.findAlunosByTurma(1);

      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { turmaId: 1, role: 'aluno' },
      });
    });

    it('deve retornar uma lista vazia se a turma não existir', async () => {
      prisma.user.findMany.mockResolvedValueOnce([]);

      const result = await service.findAlunosByTurma(999);

      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { turmaId: 999, role: 'aluno' },
      });
    });
  });
});
