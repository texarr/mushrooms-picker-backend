import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  // todo: UseGuards
  // todo: ApiResponse
  async getUserList(): Promise<User[]> {
    return this.userService.getUserList();
  }

  @Post('add')
  async userAdd(@Body() userDto: User): Promise<User> {
    return this.userService.userAdd(userDto);
  }
}
