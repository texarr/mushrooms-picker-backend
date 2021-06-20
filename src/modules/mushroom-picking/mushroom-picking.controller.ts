import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MushroomPickingService } from './mushroom-picking.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { MushroomPicking } from './mushroom-picking.entity';
import { NewPickingInterface } from './interface/new-picking.interface';
import { Request } from 'express';

@Controller('mushroom-picking')
export class MushroomPickingController {
  constructor(
    private readonly mushroomPickingService: MushroomPickingService,
  ) {}

  @Post('new')
  @UseGuards(AuthGuard('User'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'New picking event started',
    type: NewPickingInterface,
  })
  async newMushroomPicking(
    @Body() newPicking: NewPickingInterface,
    @Req() req: Request,
  ): Promise<MushroomPicking> {
    return this.mushroomPickingService.newMushroomPicking(newPicking, req);
  }
}
