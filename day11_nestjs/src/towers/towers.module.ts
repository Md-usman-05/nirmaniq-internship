import { Module } from '@nestjs/common';
import { TowersController } from './towers.controller';
import { TowersService } from './towers.service';

@Module({
  controllers: [TowersController],
  providers: [TowersService],
})
export class TowersModule {}