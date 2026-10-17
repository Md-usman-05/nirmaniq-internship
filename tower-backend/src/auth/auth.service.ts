import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Injected to generate the VIP wristbands
  ) {}

  // ==========================================
  // 1. REGISTRATION LOGIC
  // ==========================================
  async register(email: string, plainTextPassword: string, role: UserRole): Promise<{ message: string; email: string }> {
    // Check if the user already exists in the vault
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password into a chaotic string
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    // Create and save the new user
    const newUser = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      role,
    });
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully', email: newUser.email };
  }

  // ==========================================
  // 2. LOGIN LOGIC
  // ==========================================
  async login(email: string, plainTextPassword: string): Promise<{ message: string; access_token: string; role: UserRole }> {
    // Find the user in the vault
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // We throw a generic error so hackers don't know if the email exists or not
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the typed password with the scrambled hash in the vault
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, user.passwordHash);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Password is correct! Let's print the JWT VIP Wristband
    const payload = { sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
      role: user.role // Frontend Next.js uses this to show the correct dashboard
    };
  }
}