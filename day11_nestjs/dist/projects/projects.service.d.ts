import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private projects;
    findAll(): Project[];
    findOne(id: string): Project;
    create(dto: CreateProjectDto): Project;
    update(id: string, dto: UpdateProjectDto): Project;
    remove(id: string): {
        deleted: true;
        id: string;
    };
}
