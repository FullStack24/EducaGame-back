import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a user when email and password are valid', async () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: await bcrypt.hash('password', 10),
      role: Role.admin,
      name: 'Test User',
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
    expect(await service.validateUser('test@test.com', 'password')).toEqual({
      id: 1,
      email: 'test@test.com',
      role: Role.admin,
      name: 'Test User',
      turmaId: null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });

  it('should return null when email is invalid', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);
    expect(await service.validateUser('test@test.com', 'password')).toBeNull();
  });

  it('should return null when password is invalid', async () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      password: await bcrypt.hash('password', 10),
      role: Role.admin,
      name: 'Test User',
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
    expect(await service.validateUser('test@test.com', 'wrongpassword')).toBeNull();
  });

  it('should return an access token when login is called', () => {
    const user: Omit<User, 'password'> = {
      id: 1,
      email: 'test@test.com',
      role: Role.admin,
      name: 'Test User',
      turmaId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(jwtService, 'sign').mockReturnValue('token');
    expect(service.login(user)).toEqual({ access_token: 'token' });
  });
});
