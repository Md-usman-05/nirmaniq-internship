import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity, ProjectStatus } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepo: Repository<ProjectEntity>,
  ) {}

  findAll(): Promise<ProjectEntity[]> {
    return this.projectsRepo.find({
      where: { is_archived: false },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = await this.projectsRepo.findOne({ where: { id } });
    if (!project) throw new NotFoundException(`Project ${id} not found`);
    return project;
  }

  create(dto: CreateProjectDto): Promise<ProjectEntity> {
    const project = this.projectsRepo.create({
      name: dto.name,
      description: dto.description ?? null,
      status: dto.status as ProjectStatus,
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

  async getPortfolioReport() {
    return this.projectsRepo
      .createQueryBuilder('p')
      .leftJoin('towers', 't', 't.project_id = p.id')
      .select('p.id', 'id')
      .addSelect('p.name', 'name')
      .addSelect('COUNT(t.id)', 'tower_count')
      .addSelect('COALESCE(AVG(t.floors) / 50.0 * 100, 0)', 'avg_floor_completion_pct')
      .addSelect(
        `(SELECT t2.name FROM towers t2 WHERE t2.project_id = p.id ORDER BY t2.floors DESC LIMIT 1)`,
        'highest_risk_tower',
      )
      .where('p.is_archived = :archived', { archived: false })
      .groupBy('p.id')
      .addGroupBy('p.name')
      .orderBy('p.created_at', 'DESC')
      .getRawMany();
  }
}
