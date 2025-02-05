import { ForbiddenException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    service = new PermissionsService();
  });

  it('should allow admin to manage users', () => {
    expect(() => service.canManageUsers(Role.admin)).not.toThrow();
  });

  it('should allow professor to manage users', () => {
    expect(() => service.canManageUsers(Role.professor)).not.toThrow();
  });

  it('should not allow non-admin or non-professor to manage users', () => {
    expect(() => service.canManageUsers(Role.aluno)).toThrow(
      ForbiddenException,
    );
  });

  it('should allow admin to delete turma', () => {
    expect(() => service.canDeleteTurma(Role.admin)).not.toThrow();
  });

  it('should not allow non-admin to delete turma', () => {
    expect(() => service.canDeleteTurma(Role.professor)).toThrow(
      ForbiddenException,
    );
  });

  it('should allow professor to manage own turma', () => {
    expect(() => service.canManageOwnTurma(Role.professor, 1, 1)).not.toThrow();
  });

  it('should not allow non-professor or non-owner to manage own turma', () => {
    expect(() => service.canManageOwnTurma(Role.aluno, 1, 2)).toThrow(
      ForbiddenException,
    );
    expect(() => service.canManageOwnTurma(Role.professor, 1, 2)).toThrow(
      ForbiddenException,
    );
  });
});
