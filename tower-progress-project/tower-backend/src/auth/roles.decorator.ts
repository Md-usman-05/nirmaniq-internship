import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/user.entity';

// We create a custom key called 'roles'
export const ROLES_KEY = 'roles';

// This is the custom @Roles() decorator you will use above your routes.
// It takes an array of UserRoles (e.g., [UserRole.PM]) and attaches them to the route metadata.
export const Roles = (...roles: UserRole[]): CustomDecorator =>
	SetMetadata(ROLES_KEY, roles);