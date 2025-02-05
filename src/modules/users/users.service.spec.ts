import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Role } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return user by email', async () => {
    const result = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
      role: Role.admin,
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service, 'findByEmail')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findByEmail('test@test.com')).toBe(result);
  });

  it('should create user', async () => {
    const result = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
      role: Role.admin,
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service, 'createUser')
      .mockImplementation(() => Promise.resolve(result));
    expect(
      await service.createUser({
        email: 'test@test.com',
        password: 'password',
        name: 'Test',
        role: Role.admin,
      }),
    ).toBe(result);
  });

  it('should check if admin exists', async () => {
    jest
      .spyOn(service, 'adminExists')
      .mockImplementation(() => Promise.resolve(true));
    expect(await service.adminExists()).toBe(true);
  });

  it('should return all users', async () => {
    const result = [
      {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
        role: Role.admin,
        turmaId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(service, 'findAllUsers')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findAllUsers()).toBe(result);
  });

  it('should update user', async () => {
    const result = {
      id: 1,
      name: 'Test',
      email: 'updated@test.com',
      password: 'password',
      role: Role.admin,
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service, 'updateUser')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.updateUser(1, { email: 'updated@test.com' })).toBe(
      result,
    );
  });

  it('should delete user', async () => {
    const result = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
      role: Role.admin,
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service, 'deleteUser')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.deleteUser(1)).toBe(result);
  });

  it('should return user by id', async () => {
    const result = {
      id: 1,
      name: 'Test',
      email: 'test@test.com',
      password: 'password',
      role: Role.admin,
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(service, 'findUserById')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findUserById(1)).toBe(result);
  });

  it('should return students by professor', async () => {
    const result = [
      {
        id: 1,
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
        role: Role.aluno,
        turmaId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(service, 'findAlunosByProfessor')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.findAlunosByProfessor(1)).toBe(result);
  });
});
