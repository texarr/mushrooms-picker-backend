import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LogInDto } from './dto/login.dto';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';
import { EmailNotFoundException } from './exceptions/email-not-found.exception';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { IncorrectCredentialsException } from './exceptions/incorrect-credentials.exception';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { UserRemovedException } from './exceptions/user-removed.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async userLogin(loginDto: LogInDto): Promise<JwtResponseInterface> {
    const user = await this.userService.findOneUserByEmail(loginDto.email);

    if (!user) {
      throw new EmailNotFoundException();
    }

    if (user.deleted) {
      throw new UserRemovedException();
    }

    return this.validateUser(user, loginDto.password);
  }

  async validateUser(
    user: User,
    password: string,
  ): Promise<JwtResponseInterface> {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new IncorrectCredentialsException();
    }
    delete user.password;
    const jwtResponse = this.createToken({
      email: user.email,
      id: user.id,
    });
    jwtResponse.user = user;
    return jwtResponse;
  }

  createToken(user: JwtPayloadInterface): JwtResponseInterface {
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });
    return {
      expiresIn: 3600000,
      accessToken,
    };
  }
}
