import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TowersService } from './towers.service';
import { CreateTowerDto } from './dto/create-tower.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('towers')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class TowersController {
  constructor(private readonly towersService: TowersService) {}

  @Post()
  @Roles(UserRole.PM) 
  create(@Body() createTowerDto: CreateTowerDto) {
    return this.towersService.create(createTowerDto);
  }
  // ==========================================
  // NEW: Get Single Tower Route
  // ==========================================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.towersService.findOne(id);
  }
  @Patch(':id/progress')
  @Roles(UserRole.SE) 
  updateProgress(
    @Param('id') id: string, 
    @Body() updateProgressDto: UpdateProgressDto
  ) {
    return this.towersService.updateProgress(id, updateProgressDto);
  }

  @Delete(':id')
  @Roles(UserRole.PM) 
  remove(@Param('id') id: string) {
    return this.towersService.remove(id);
  }
}