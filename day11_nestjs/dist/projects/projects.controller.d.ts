import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): import("./project.entity").Project[];
    findOne(id: string): import("./project.entity").Project;
    create(dto: CreateProjectDto): import("./project.entity").Project;
    update(id: string, dto: UpdateProjectDto): import("./project.entity").Project;
    remove(id: string): {
        deleted: true;
        id: string;
    };
}
