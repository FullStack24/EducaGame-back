import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { prismaMock } from '../../mocks/prisma.mock';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should create a notification', async () => {
    const createNotificationDto = {
      title: 'New Notification',
      message: 'This is a test notification',
      destinatarioTipo: 'user',
      destinatarioId: 1,
    };

    prismaMock.notificacao.create.mockResolvedValue({
      id: 1,
      ...createNotificationDto,
    });

    const result = await service.create(createNotificationDto);

    expect(prismaMock.notificacao.create).toHaveBeenCalledWith({
      data: createNotificationDto,
    });

    expect(result).toEqual({
      id: 1,
      ...createNotificationDto,
    });
  });

  it('should return all notifications', async () => {
    const mockNotifications = [
      {
        id: 1,
        title: 'Notification 1',
        message: 'Message 1',
        destinatarioTipo: 'user',
        destinatarioId: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Notification 2',
        message: 'Message 2',
        destinatarioTipo: 'user',
        destinatarioId: 2,
        createdAt: new Date(),
      },
    ];

    prismaMock.notificacao.findMany.mockResolvedValue(mockNotifications);

    const result = await service.findAll();

    expect(prismaMock.notificacao.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
    expect(result).toEqual(mockNotifications);
  });

  it('should return one notification', async () => {
    const mockNotification = {
      id: 1,
      title: 'Notification 1',
      message: 'Message 1',
      destinatarioTipo: 'user',
      destinatarioId: 1,
      createdAt: new Date(),
    };

    prismaMock.notificacao.findUnique.mockResolvedValue(mockNotification);

    const result = await service.findOne(1);

    expect(prismaMock.notificacao.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockNotification);
  });

  it('should update a notification', async () => {
    const updateNotificationDto = {
      title: 'Updated Notification',
      message: 'Updated Message',
    };
    const mockUpdatedNotification = {
      id: 1,
      ...updateNotificationDto,
      destinatarioTipo: 'user',
      destinatarioId: 1,
      createdAt: new Date(),
    };

    prismaMock.notificacao.update.mockResolvedValue(mockUpdatedNotification);

    const result = await service.update(1, updateNotificationDto);

    expect(prismaMock.notificacao.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updateNotificationDto,
    });
    expect(result).toEqual(mockUpdatedNotification);
  });

  it('should remove a notification', async () => {
    const mockNotification = {
      id: 1,
      title: 'Notification 1',
      message: 'Message 1',
      destinatarioTipo: 'user',
      destinatarioId: 1,
      createdAt: new Date(),
    };

    prismaMock.notificacao.delete.mockResolvedValue(mockNotification);

    const result = await service.remove(1);

    expect(prismaMock.notificacao.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockNotification);
  });
});
