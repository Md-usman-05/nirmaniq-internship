import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // The Bouncer for JWT
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  // ==========================================
  // 1. REGISTRATION ROUTE (Public)
  // ==========================================
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<{ message: string; email: string }> {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.role,
    );
  }

  // ==========================================
  // 2. LOGIN ROUTE (Public)
  // ==========================================
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ message: string; access_token: string; role: UserRole }> {
    return this.authService.login(
      loginDto.email, 
      loginDto.password
    );
  }

  // ==========================================
  // 3. SECURE TEST ROUTE (Protected)
  // ==========================================
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // <-- This activates jwt.strategy.ts!
  getProfile(@Request() req: { user: { userId: string; role: UserRole } }): { message: string; user: { userId: string; role: UserRole } } {
    // If the token is valid, req.user will contain the exact data we defined in jwt.strategy.ts
    return {
      message: 'You have accessed a secure route!',
      user: req.user, 
    };
  }
}