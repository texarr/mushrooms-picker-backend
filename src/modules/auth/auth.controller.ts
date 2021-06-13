import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

  @Get('login')
  loginUser(): string {
    return 'todo: login';
  }

  @Post('register')
  registerUser(): string {
    return 'todo: register user';
  }
}
