import { Tower } from './tower.entity';
import { CreateTowerDto } from './dto/create-tower.dto';
export declare class TowersService {
    private towers;
    findByProject(projectId: string): Tower[];
    create(projectId: string, dto: CreateTowerDto): Tower;
}
