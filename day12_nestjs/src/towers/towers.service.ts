import { Injectable } from '@nestjs/common';
import { Tower } from './tower.entity';
import { CreateTowerDto } from './dto/create-tower.dto';

@Injectable()
export class TowersService {
  private towers: Tower[] = [
    { id: 't1', projectId: '1', name: 'Tower A', floors: 20, status: 'Under Construction', floorList: [{ name: 'Ground', number: 1 }] },
    { id: 't2', projectId: '1', name: 'Tower B', floors: 18, status: 'Planned', floorList: [] },
    { id: 't3', projectId: '3', name: 'Main Station', floors: 3, status: 'Completed', floorList: [] },
  ];

  findByProject(projectId: string): Tower[] {
    return this.towers.filter((t) => t.projectId === projectId);
  }

  create(projectId: string, dto: CreateTowerDto): Tower {
    const tower: Tower = {
      id: String(Date.now()),
      projectId,
      ...dto,
    };
    this.towers.push(tower);
    return tower;
  }
}