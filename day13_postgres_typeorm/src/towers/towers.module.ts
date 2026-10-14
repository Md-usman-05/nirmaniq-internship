import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TowerEntity } from './entities/tower.entity';
import { FloorEntity } from '../floors/entities/floor.entity';
import { TowersController } from './towers.controller';
import { TowersService } from './towers.service';

@Module({
  imports: [TypeOrmModule.forFeature([TowerEntity, FloorEntity])],
  controllers: [TowersController],
  providers: [TowersService],
})
export class TowersModule {}
