import { HttpException, HttpStatus } from '@nestjs/common';

export class UserRemovedException extends HttpException {
  constructor() {
    super('User removed', HttpStatus.FORBIDDEN);
  }
}
