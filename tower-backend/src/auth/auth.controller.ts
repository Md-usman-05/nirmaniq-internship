import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../users/user.entity';
import { Roles } from './roles.decorator'; // Import the Sticky Note tool
import { RolesGuard } from './roles.guard'; // Import the Second Bouncer

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<{ message: string; email: string }> {
    return this.authService.register(registerDto.email, registerDto.password, registerDto.role);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ message: string; access_token: string; role: UserRole }> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // ==========================================
  // Route for EVERYONE who is logged in
  // ==========================================
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) 
  getProfile(@Request() req: { user: { userId: string; role: UserRole } }): { message: string; user: { userId: string; role: UserRole } } {
    return { message: 'You have accessed a secure route!', user: req.user };
  }

  // ==========================================
  // Route ONLY for Project Managers (PM)
  // ==========================================
  @Get('pm-dashboard')
  @Roles(UserRole.PM) // 1. Attach the sticky note saying "PM Only"
  @UseGuards(AuthGuard('jwt'), RolesGuard) // 2. Stack the JWT Scanner AND the Roles Guard
  getPmData(): { message: string; data: string } {
    return { 
      message: 'Welcome Project Manager!', 
      data: 'Here is the highly sensitive project budget data.' 
    };
  }
}