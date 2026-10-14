import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './database/data-source';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      migrations: [],
    }),
    ProjectsModule,
    TowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
