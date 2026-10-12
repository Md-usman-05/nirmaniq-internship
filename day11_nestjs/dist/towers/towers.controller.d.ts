import { TowersService } from './towers.service';
import { CreateTowerDto } from './dto/create-tower.dto';
export declare class TowersController {
    private readonly towersService;
    constructor(towersService: TowersService);
    findByProject(projectId: string): import("./tower.entity").Tower[];
    create(projectId: string, dto: CreateTowerDto): import("./tower.entity").Tower;
}
