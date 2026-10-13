import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, ProjectStatus } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

type Project = {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  towerCount: number;
  updatedAt: string;
};

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    { id: '1', name: 'Skyline Tower', description: 'Residential', status: ProjectStatus.ACTIVE, towerCount: 3, updatedAt: '2026-10-07' },
    { id: '2', name: 'Riverside Bridge', description: 'Infrastructure', status: ProjectStatus.PLANNING, towerCount: 1, updatedAt: '2026-10-05' },
    { id: '3', name: 'Metro Station Phase 2', description: 'Transit', status: ProjectStatus.COMPLETED, towerCount: 2, updatedAt: '2026-09-28' },
    { id: '4', name: 'Harbor Warehouse', description: 'Logistics', status: ProjectStatus.ON_HOLD, towerCount: 5, updatedAt: '2026-10-01' },
  ];

  findAll(): Project[] {
    return this.projects;
  }

  findOne(id: string): Project {
    const project = this.projects.find((p) => p.id === id);
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  create(dto: CreateProjectDto): Project {
    const project: Project = {
      id: String(Date.now()),
      ...dto,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    this.projects.push(project);
    return project;
  }

  update(id: string, dto: UpdateProjectDto): Project {
    const project = this.findOne(id);
    Object.assign(project, dto, { updatedAt: new Date().toISOString().slice(0, 10) });
    return project;
  }

  remove(id: string): { deleted: true; id: string } {
    const idx = this.projects.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException(`Project ${id} not found`);
    this.projects.splice(idx, 1);
    return { deleted: true, id };
  }
}