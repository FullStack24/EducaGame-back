import { Test, TestingModule } from '@nestjs/testing';
import { GamificationController } from './gamification.controller';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { GamificationService } from './gamification.service';
import { AdicionarPontosDto } from './dto/adicionar-pontos.dto';
import { AtribuirBadgeDto } from './dto/atribuir-badge.dto';
import { Role } from '@prisma/client';

describe('GamificationController', () => {
  let controller: GamificationController;
  let service: GamificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamificationController],
      providers: [GamificationService, PrismaService],
    }).compile();

    controller = module.get<GamificationController>(GamificationController);
    service = module.get<GamificationService>(GamificationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add points', async () => {
    const dto: AdicionarPontosDto = {
      alunoId: 1,
      quizId: 1,
      pontos: 10,
    };

    const result = {
      ...dto,
      id: 1,
      pontuacao: 10,
      feedback: null,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'adicionarPontos').mockResolvedValue(result);

    expect(await controller.adicionarPontos(dto)).toEqual(result);
  });

  it('should list ranking', async () => {
    const result = [
      {
        aluno: {
          id: 1,
          createdAt: new Date(),
          name: 'Aluno 1',
          turmaId: null,
          updatedAt: new Date(),
          email: 'aluno1@example.com',
          password: 'password',
          role: Role.aluno,
        },
        id: 1,
        alunoId: 1,
        quizId: 1,
        pontuacao: 10,
        feedback: null,
        createdAt: new Date(),
      },
    ];

    jest.spyOn(service, 'listarRanking').mockResolvedValue(result);

    expect(await controller.listarRanking(1)).toEqual(result);
  });

  it('should list badges', async () => {
    const result = [
      {
        id: 1,
        alunoId: 1,
        createdAt: new Date(),
        title: 'Badge 1',
        description: 'Description 1',
      },
    ];

    jest.spyOn(service, 'listarBadges').mockResolvedValue(result);

    expect(await controller.listarBadges(1)).toEqual(result);
  });

  it('should assign badge', async () => {
    const dto: AtribuirBadgeDto = {
      alunoId: 1,
      title: 'Badge 1',
      description: 'Description 1',
    };

    const result = {
      ...dto,
      id: 1,
      createdAt: new Date(),
      description: dto.description ?? null,
    };

    jest.spyOn(service, 'atribuirBadge').mockResolvedValue(result);

    expect(await controller.atribuirBadge(dto)).toEqual(result);
  });

  it('should get student results', async () => {
    const result = [
      {
        alunoId: 1,
        quizId: 1,
        pontuacao: 10,
        quiz: {
          id: 1,
          createdAt: new Date(),
          title: 'Quiz 1',
          description: 'Description 1',
          turmaId: 1,
          categoria: 'Categoria 1',
          updatedAt: new Date(),
        },
        id: 1,
        feedback: null,
        createdAt: new Date(),
      },
    ];

    jest.spyOn(service, 'obterResultadosAluno').mockResolvedValue(result);

    expect(await controller.obterResultadosAluno(1, 1)).toEqual(result);
  });

  it('should get class report', async () => {
    const result = [
      {
        alunoId: 1,
        quizId: 1,
        pontuacao: 10,
        quiz: {
          id: 1,
          createdAt: new Date(),
          title: 'Quiz 1',
          description: 'Description 1',
          turmaId: 1,
          categoria: 'Categoria 1',
          updatedAt: new Date(),
        },
        aluno: {
          id: 1,
          createdAt: new Date(),
          name: 'Aluno 1',
          turmaId: 1,
          updatedAt: new Date(),
          email: 'aluno1@example.com',
          password: 'password',
          role: Role.aluno,
        },
        id: 1,
        feedback: null,
        createdAt: new Date(),
      },
    ];

    jest.spyOn(service, 'obterRelatorioTurma').mockResolvedValue(result);

    expect(await controller.obterRelatorioTurma(1)).toEqual(result);
  });
});
