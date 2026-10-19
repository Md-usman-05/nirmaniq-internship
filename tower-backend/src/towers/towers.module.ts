import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TowersController } from './towers.controller';
import { TowersService } from './towers.service';
import { Tower } from './tower.entity'; // <-- Import the entity

@Module({
  // This physically creates the 'tower' table in PostgreSQL
  imports: [TypeOrmModule.forFeature([Tower])],
  controllers: [TowersController],
  providers: [TowersService]
})
export class TowersModule {}