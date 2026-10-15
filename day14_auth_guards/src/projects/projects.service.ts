import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepo: Repository<ProjectEntity>,
  ) {}

  findAll(): Promise<ProjectEntity[]> {
    return this.projectsRepo.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  create(dto: CreateProjectDto, ownerId: string): Promise<ProjectEntity> {
    const project = this.projectsRepo.create({
      name: dto.name,
      description: dto.description ?? null,
      status: dto.status,
      owner_id: ownerId,
    });
    return this.projectsRepo.save(project);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectEntity> {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.projectsRepo.save(project);
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    const project = await this.findOne(id);
    await this.projectsRepo.remove(project);
    return { deleted: true, id };
  }
}
