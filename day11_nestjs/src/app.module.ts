import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';

@Module({
  imports: [ProjectsModule, TowersModule],
})
export class AppModule {}