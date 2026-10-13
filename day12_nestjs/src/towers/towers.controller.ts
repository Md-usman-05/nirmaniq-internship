import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TowersService } from './towers.service';
import { CreateTowerDto } from './dto/create-tower.dto';

@Controller('projects/:projectId/towers')
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Get()
  findByProject(@Param('projectId') projectId: string) {
    return this.towersService.findByProject(projectId);
  }

  @Post()
  create(@Param('projectId') projectId: string, @Body() dto: CreateTowerDto) {
    return this.towersService.create(projectId, dto);
  }
}