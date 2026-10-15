import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { RefreshTokenEntity } from '../auth/refresh/refresh-token.entity';
import { ProjectEntity } from '../projects/entities/project.entity';
import { UserEntity } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'nirmaniq',
  password: process.env.DB_PASSWORD ?? 'nirmaniq_dev',
  database: process.env.DB_DATABASE ?? 'nirmaniq_auth',
  entities: [UserEntity, RefreshTokenEntity, ProjectEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
