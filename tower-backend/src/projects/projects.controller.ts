import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('projects')
@UseGuards(AuthGuard('jwt'), RolesGuard) 
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.PM) 
  create(
    @Body() createProjectDto: CreateProjectDto, 
    @Request() req: { user: { userId: string; role: UserRole } }
  ) {
    return this.projectsService.create(createProjectDto, req.user.userId);
  }

  // ==========================================
  // UPGRADED: GET Route with Search Query
  // ==========================================
  @Get()
  findAll(@Query('search') search?: string) {
    return this.projectsService.findAll(search);
  }

  // ==========================================
  // NEW: Get Single Project Route
  // URL Example: /projects/123-abc
  // ==========================================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  // ==========================================
  // NEW: Edit Project Route (PM Only)
  // ==========================================
  @Patch(':id')
  @Roles(UserRole.PM) 
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // ==========================================
  // NEW: Delete Project Route (PM Only)
  // ==========================================
  @Delete(':id')
  @Roles(UserRole.PM) 
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}