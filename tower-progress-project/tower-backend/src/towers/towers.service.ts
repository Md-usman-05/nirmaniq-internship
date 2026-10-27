import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tower } from './tower.entity';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class TowersService {
  constructor(
    @InjectRepository(Tower)
    private towerRepository: Repository<Tower>,
  ) {}

  async create(createTowerDto: CreateTowerDto): Promise<Tower> {
    // Automatically generate the floors array based on totalFloors
    const initialFloors = Array.from({ length: createTowerDto.totalFloors }, (_, i) => ({
      floorNumber: i + 1,
      status: 'PENDING',
    }));

    const newTower = this.towerRepository.create({
      name: createTowerDto.name,
      totalFloors: createTowerDto.totalFloors,
      floors: initialFloors,
      project: { id: createTowerDto.projectId }, 
    });

    return this.towerRepository.save(newTower);
  }
  // ==========================================
  // NEW: Fetch a single tower by ID
  // ==========================================
  async findOne(id: string) {
    const tower = await this.towerRepository.findOne({
      where: { id },
    });
    
    if (!tower) {
      throw new NotFoundException(`Tower with ID ${id} not found`);
    }
    return tower;
  }

  async updateProgress(id: string, updateDto: UpdateProgressDto): Promise<Tower> {
    const tower = await this.towerRepository.findOne({ where: { id } });
    if (!tower) throw new NotFoundException(`Tower with ID ${id} not found`);

    // Find the specific floor in the JSON array and update its status
    const floorIndex = tower.floors.findIndex(f => f.floorNumber === updateDto.floorNumber);
    if (floorIndex > -1) {
      tower.floors[floorIndex].status = updateDto.status;
    } else {
      throw new NotFoundException(`Floor ${updateDto.floorNumber} does not exist in this tower`);
    }

    // Recalculate the overall progress percentage dynamically
    const completedFloors = tower.floors.filter(f => f.status === 'COMPLETED').length;
    tower.progressPercentage = Math.round((completedFloors / tower.totalFloors) * 100);

    return this.towerRepository.save(tower);
  }

  async remove(id: string): Promise<void> {
    const result = await this.towerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tower with ID ${id} not found`);
    }
  }
}