import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserRole } from '../users/user.entity'; // Import our Role Enum

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MY_SUPER_SECRET_KEY', 
    });
  }

  // We strictly define the payload shape: sub is a string (UUID), role is our Enum.
  async validate(payload: { sub: string; role: UserRole }): Promise<{ userId: string; role: UserRole }> {
    return { userId: payload.sub, role: payload.role };
  }
}