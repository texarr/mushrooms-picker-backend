import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'User') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: JwtPayloadInterface) {
    const user = await this.userService.findOneUserByEmail(jwtPayload.email);
    if (!user) {
      throw new UnauthorizedException('Not authorized as user');
    }

    if (user.deleted) {
      throw new UnauthorizedException(
        'User with this email is currently removed',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account not active');
    }

    return user;
  }
}
