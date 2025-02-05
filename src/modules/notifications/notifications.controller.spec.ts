import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should create a notification', async () => {
    const createNotificationDto = {
      title: 'New Notification',
      message: 'This is a test notification',
      destinatarioTipo: 'user',
      destinatarioId: 1,
    };

    const notification = {
      id: 1,
      ...createNotificationDto,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'create').mockResolvedValue(notification);

    expect(await controller.create(createNotificationDto)).toBe(notification);
  });

  it('should find all notifications', async () => {
    const result = [
      {
        id: 1,
        title: 'Title 1',
        message: 'Message 1',
        destinatarioTipo: 'user',
        destinatarioId: 1,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Title 2',
        message: 'Message 2',
        destinatarioTipo: 'user',
        destinatarioId: 2,
        createdAt: new Date(),
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should find one notification', async () => {
    const result = {
      id: 1,
      title: 'Title',
      message: 'Message',
      destinatarioTipo: 'user',
      destinatarioId: 1,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne(1)).toBe(result);
  });

  it('should update a notification', async () => {
    const updateNotificationDto = {
      title: 'Updated Notification',
      message: 'This is an updated notification',
      destinatarioTipo: 'user',
      destinatarioId: 1,
    };

    const notification = {
      id: 1,
      ...updateNotificationDto,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'update').mockResolvedValue(notification);

    expect(await controller.update(1, updateNotificationDto)).toBe(
      notification,
    );
  });

  it('should remove a notification', async () => {
    const result = {
      id: 1,
      title: 'Title',
      message: 'Message',
      destinatarioTipo: 'user',
      destinatarioId: 1,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'remove').mockResolvedValue(result);

    expect(await controller.remove(1)).toBe(result);
  });
});
