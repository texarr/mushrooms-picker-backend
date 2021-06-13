import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { EmailTakenException } from './exceptions/email-taken.exception';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserList(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async userAdd(newUser: User): Promise<User> {
    const userExists = await this.userRepository.findOne({
      email: newUser.email,
    });

    if (userExists) {
      throw new EmailTakenException();
    }

    const user = new User();
    plainToClassFromExist(user, { ...newUser });
    user.setPassword(newUser.password);

    await this.userRepository.save(user);
    delete user.password;
    return user;
  }
}
