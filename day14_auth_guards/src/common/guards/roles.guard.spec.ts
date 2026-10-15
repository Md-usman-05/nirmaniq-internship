import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  const projectCreatorRoles = [Role.CXO, Role.SE, Role.PE, Role.PM];

  const createContext = (role?: Role) =>
    ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => (role ? { user: { role } } : { user: undefined }),
      }),
    }) as unknown as ExecutionContext;

  it.each(projectCreatorRoles)('allows %s to create a project', (role) => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(projectCreatorRoles),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(guard.canActivate(createContext(role))).toBe(true);
  });

  it.each([Role.PD, Role.TA, Role.SA])(
    'rejects %s from creating a project',
    (role) => {
      const reflector = {
        getAllAndOverride: jest.fn().mockReturnValue(projectCreatorRoles),
      } as unknown as Reflector;
      const guard = new RolesGuard(reflector);

      expect(() => guard.canActivate(createContext(role))).toThrow(
        ForbiddenException,
      );
    },
  );

  it('allows only SA to delete a project', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue([Role.SA]),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(guard.canActivate(createContext(Role.SA))).toBe(true);
    expect(() => guard.canActivate(createContext(Role.PM))).toThrow(
      ForbiddenException,
    );
  });

  it('rejects a request without an authenticated user', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(projectCreatorRoles),
    } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    expect(() => guard.canActivate(createContext())).toThrow(
      ForbiddenException,
    );
  });
});
