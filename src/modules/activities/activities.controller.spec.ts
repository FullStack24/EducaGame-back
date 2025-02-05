import { UpdateActivityDto } from './dto/update-activity.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../shared/prisma/prisma.service';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;
  let service: ActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [ActivitiesService, PrismaService],
    }).compile();

    controller = module.get<ActivitiesController>(ActivitiesController);
    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an activity', async () => {
    const dto: CreateActivityDto = {
      title: 'Test Activity',
      description: 'Test Description',
      link: 'www.test.com',
      turmaId: 1,
      createdById: 1,
    };

    jest.spyOn(service, 'criarAtividade').mockImplementation(() =>
      Promise.resolve({
        ...dto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        filePath: null,
        description: dto.description ?? null,
        link: dto.link ?? null,
      }),
    );

    const expected = {
      ...dto,
      id: 1,
      createdAt: expect.any(Date) as unknown as Date,
      updatedAt: expect.any(Date) as unknown as Date,
      filePath: null,
    };
    expect(await controller.criarAtividade(dto)).toEqual(expected);
  });

  it('should list activities by turmaId', async () => {
    const result = [
      {
        title: 'Test Activity',
        description: 'Test Description',
        link: 'www.test.com',
        turmaId: 1,
        createdById: 1,
      },
    ];

    jest.spyOn(service, 'listarAtividadesTurma').mockImplementation(() =>
      Promise.resolve([
        {
          ...result[0],
          id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          filePath: null,
        },
      ]),
    );

    const expected = [
      {
        ...result[0],
        id: 1,
        createdAt: expect.any(Date) as unknown as Date,
        updatedAt: expect.any(Date) as unknown as Date,
        filePath: null,
      },
    ];
    expect(await controller.listarAtividadesTurma(1)).toEqual(expected);
  });

  it('should update an activity', async () => {
    const dto: UpdateActivityDto = {
      title: 'Updated Test Activity',
      description: 'Updated Test Description',
      link: 'www.updatedtest.com',
    };

    jest.spyOn(service, 'editarAtividade').mockImplementation(() =>
      Promise.resolve({
        ...dto,
        id: 1,
        turmaId: 1,
        createdById: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        filePath: null,
        title: dto.title ?? '',
        description: dto.description ?? null,
        link: dto.link ?? null,
      }),
    );

    const expected = {
      ...dto,
      id: 1,
      turmaId: 1,
      createdById: 1,
      createdAt: expect.any(Date) as unknown as Date,
      updatedAt: expect.any(Date) as unknown as Date,
      filePath: null,
    };
    expect(await controller.editarAtividade(1, dto)).toEqual(expected);
  });

  it('should delete an activity', async () => {
    const result = { deleted: true };

    jest.spyOn(service, 'excluirAtividade').mockImplementation(() =>
      Promise.resolve({
        ...result,
        id: 1,
        title: 'Test Activity',
        description: 'Test Description',
        link: 'www.test.com',
        turmaId: 1,
        createdById: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        filePath: null,
      }),
    );

    const expected = {
      ...result,
      id: 1,
      title: 'Test Activity',
      description: 'Test Description',
      link: 'www.test.com',
      turmaId: 1,
      createdById: 1,
      createdAt: expect.any(Date) as unknown as Date,
      updatedAt: expect.any(Date) as unknown as Date,
      filePath: null,
    };
    expect(await controller.excluirAtividade(1)).toEqual(expected);
  });
});
