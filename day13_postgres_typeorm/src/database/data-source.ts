import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ProjectEntity } from '../projects/entities/project.entity';
import { TowerEntity } from '../towers/entities/tower.entity';
import { FloorEntity } from '../floors/entities/floor.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nirmaniq',
  password: 'nirmaniq_dev',
  database: 'nirmaniq_training',
  entities: [ProjectEntity, TowerEntity, FloorEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});