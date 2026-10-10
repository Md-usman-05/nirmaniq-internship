import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    { id: '1', name: 'Skyline Tower', status: 'Active', progress: 65, risk: 'Low', updatedAt: '2026-10-07' },
    { id: '2', name: 'Riverside Bridge', status: 'Pending', progress: 15, risk: 'Medium', updatedAt: '2026-10-05' },
    { id: '3', name: 'Metro Station Phase 2', status: 'Completed', progress: 100, risk: 'Low', updatedAt: '2026-09-28' },
    { id: '4', name: 'Harbor Warehouse', status: 'On Hold', progress: 40, risk: 'High', updatedAt: '2026-10-01' },
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
