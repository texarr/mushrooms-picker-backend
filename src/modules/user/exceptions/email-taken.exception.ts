import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailTakenException extends HttpException {
  constructor() {
    super('User with that email already exists.', HttpStatus.FORBIDDEN);
  }
}
