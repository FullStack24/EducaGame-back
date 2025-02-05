import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { PrismaService } from '../../shared/prisma/prisma.service';

describe('QuizzesController', () => {
  let controller: QuizzesController;
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [QuizzesService, PrismaService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a quiz', async () => {
    const createQuizDto: CreateQuizDto = {
      title: 'New Quiz',
      description: 'This is a test quiz.',
      categoria: 'Mathematics',
      turmaId: 1,
    };

    const result = {
      id: 1,
      ...createQuizDto,
      description: createQuizDto.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(service, 'createQuiz').mockResolvedValue(result);

    expect(await controller.createQuiz(createQuizDto)).toEqual(result);
  });

  it('should return quizzes by turma', async () => {
    const turmaId = 1;
    const mockQuizzes = [
      {
        id: 1,
        title: 'Quiz 1',
        description: 'Math Quiz',
        categoria: 'Mathematics',
        turmaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        perguntas: [],
      },
      {
        id: 2,
        title: 'Quiz 2',
        description: 'Science Quiz',
        categoria: 'Science',
        turmaId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        perguntas: [],
      },
    ];

    jest.spyOn(service, 'findQuizzesByTurma').mockResolvedValue(mockQuizzes);

    expect(await controller.findQuizzesByTurma(turmaId)).toEqual(mockQuizzes);
  });

  it('should update a quiz', async () => {
    const updateQuizDto = {
      title: 'Updated Quiz',
      description: 'Updated Description',
    };
    const mockUpdatedQuiz = {
      id: 1,
      ...updateQuizDto,
      categoria: 'Mathematics',
      turmaId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(service, 'updateQuiz').mockResolvedValue(mockUpdatedQuiz);

    expect(await controller.updateQuiz(1, updateQuizDto)).toEqual(
      mockUpdatedQuiz,
    );
  });

  it('should delete a quiz', async () => {
    const mockQuiz = {
      id: 1,
      title: 'Quiz 1',
      description: 'Math Quiz',
      categoria: 'Mathematics',
      turmaId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(service, 'deleteQuiz').mockResolvedValue(mockQuiz);

    expect(await controller.deleteQuiz(1)).toEqual(mockQuiz);
  });
});
