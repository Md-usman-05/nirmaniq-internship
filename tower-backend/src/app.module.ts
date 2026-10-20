import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TowersModule } from './towers/towers.module';

@Module({
  imports: [
    // ==========================================
    // Database Connection
    // ==========================================
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'tower_tracker',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    TowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}