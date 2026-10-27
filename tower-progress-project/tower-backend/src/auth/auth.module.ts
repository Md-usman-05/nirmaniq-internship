import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy'; // <-- Import this

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'MY_SUPER_SECRET_KEY', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  // Add JwtStrategy to the providers list!
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}