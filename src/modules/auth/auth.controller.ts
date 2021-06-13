import { Body, Controller, Get, Post } from '@nestjs/common';
import { JwtResponseInterface } from './interfaces/jwt-response.interface';
import { LogInDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/login')
  async userLogin(@Body() loginDto: LogInDto): Promise<JwtResponseInterface> {
    return this.authService.userLogin(loginDto);
  }
}
