import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from '../floors/entities/floor.entity';
import { CreateTowerDto } from './dto/create-tower.dto';

@Injectable()
export class TowersService {
  constructor(
    @InjectRepository(TowerEntity)
    private readonly towersRepo: Repository<TowerEntity>,
    @InjectRepository(FloorEntity)
    private readonly floorsRepo: Repository<FloorEntity>,
  ) {}

  findByProject(projectId: string): Promise<TowerEntity[]> {
    return this.towersRepo.find({
      where: { project_id: projectId },
      relations: { floor_list: true },
      order: { created_at: 'ASC' },
    });
  }

  async create(projectId: string, dto: CreateTowerDto): Promise<TowerEntity> {
    const tower = this.towersRepo.create({
      project_id: projectId,
      name: dto.name,
      floors: dto.floors,
      status: dto.status,
    });
    const saved = await this.towersRepo.save(tower);

    if (dto.floorList && dto.floorList.length) {
      const floors = dto.floorList.map((f) =>
        this.floorsRepo.create({ name: f.name, number: f.number, tower_id: saved.id }),
      );
      await this.floorsRepo.save(floors);
    }

    return (await this.towersRepo.findOne({
      where: { id: saved.id },
      relations: { floor_list: true },
    })) as TowerEntity;
  }
}
