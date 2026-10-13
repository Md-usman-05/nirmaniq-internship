import { Exclude, Expose } from 'class-transformer';
import { ProjectStatus } from './create-project.dto';

@Exclude()
export class ProjectResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  status: ProjectStatus;

  @Expose()
  towerCount: number;

  @Expose()
  updatedAt: string;
}