import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of users',
    type: User,
    isArray: true,
  })
  async getUserList(): Promise<User[]> {
    return this.userService.getUserList();
  }

  @Post('add')
  async userAdd(@Body() userDto: User): Promise<User> {
    return this.userService.userAdd(userDto);
  }
}
