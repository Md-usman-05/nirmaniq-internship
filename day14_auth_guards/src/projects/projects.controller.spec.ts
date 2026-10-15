jest.mock('./dto/update-project.dto', () => ({
  UpdateProjectDto: class UpdateProjectDto {},
}));
jest.mock('./projects.service', () => ({
  ProjectsService: class ProjectsService {},
}));

import { ROLES_KEY } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { ProjectsController } from './projects.controller';

describe('ProjectsController role requirements', () => {
  const getRoles = (methodName: 'create' | 'remove') => {
    const prototype = ProjectsController.prototype as unknown as Record<
      'create' | 'remove',
      unknown
    >;
    const handler = prototype[methodName];
    if (typeof handler !== 'function') {
      throw new Error(`Missing controller handler: ${methodName}`);
    }
    return Reflect.getMetadata(ROLES_KEY, handler) as Role[] | undefined;
  };

  it('allows PM and higher roles to create projects', () => {
    expect(getRoles('create')).toEqual([Role.CXO, Role.SE, Role.PE, Role.PM]);
  });

  it('restricts project deletion to SA', () => {
    expect(getRoles('remove')).toEqual([Role.SA]);
  });
});
