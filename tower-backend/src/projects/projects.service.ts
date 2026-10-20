import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm'; 
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto'; 

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, managerId: string): Promise<Project> {
    const newProject = this.projectRepository.create({
      ...createProjectDto,
      manager: { id: managerId }, 
    });
    return this.projectRepository.save(newProject);
  }

  // ==========================================
  // NEW: Fetch a single project by ID with its towers
  // ==========================================
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: { towers: true }, // Attach the nested towers
    });
    if (!project) throw new NotFoundException(`Project with ID ${id} not found`);
    return project;
  }

  // ==========================================
  // UPGRADED: Fetch with optional search filter
  // ==========================================
  async findAll(search?: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: search ? [
        { name: ILike(`%${search}%`) },       
        { location: ILike(`%${search}%`) }    
      ] : {},
      relations: { towers: true },
    });
  }

  // ==========================================
  // NEW: Update a project
  // ==========================================
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, updateProjectDto);
    
    const updatedProject = await this.projectRepository.findOne({ where: { id } });
    if (!updatedProject) throw new NotFoundException(`Project with ID ${id} not found`);
    return updatedProject;
  }

  // ==========================================
  // NEW: Delete a project
  // ==========================================
  async remove(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}