import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  // The Reflector is a built-in NestJS tool that reads the @Roles() sticky notes
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Read the sticky note on the route to see what roles are required
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. If there is no @Roles() sticky note, the door is open to anyone logged in. Let them pass.
    if (!requiredRoles) {
      return true;
    }

    // 3. Grab the HTTP request, which contains the 'req.user' object placed there by the JwtStrategy
    const { user } = context.switchToHttp().getRequest();

    // 4. Check if the user's role exists in the array of required roles
    // If it returns true, the door opens. If false, NestJS automatically throws a 403 Forbidden error.
    return requiredRoles.includes(user.role);
  }
}