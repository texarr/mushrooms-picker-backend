import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MushroomPicking } from './mushroom-picking.entity';
import { Repository } from 'typeorm';
import { NewPickingInterface } from './interface/new-picking.interface';
import { User } from '../user/user.entity';
import { Request } from 'express';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MushroomPickingService {
  constructor(
    @InjectRepository(MushroomPicking)
    private readonly mushroomPickingRepository: Repository<MushroomPicking>,
  ) {}

  async newMushroomPicking(
    newPicking: NewPickingInterface,
    req: Request,
  ): Promise<MushroomPicking> {
    let newPickDto: MushroomPicking = null;

    if (req.user) {
      newPickDto = new MushroomPicking(newPicking);
      newPickDto.user = plainToClass(User, req.user);
    }

    // todo: do not start new pick if any other is not finished

    await this.mushroomPickingRepository.save(newPickDto);

    delete newPickDto?.user.password;
    return newPickDto;
  }
}
