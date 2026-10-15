import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { UserEntity } from './users/entities/user.entity';
import { RefreshTokenEntity } from './auth/refresh/refresh-token.entity';
import { ProjectEntity } from './projects/entities/project.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'nirmaniq',
      password: process.env.DB_PASSWORD ?? 'nirmaniq_dev',
      database: process.env.DB_DATABASE ?? 'nirmaniq_auth',
      entities: [UserEntity, RefreshTokenEntity, ProjectEntity],
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: AppExceptionFilter },
  ],
})
export class AppModule {}
