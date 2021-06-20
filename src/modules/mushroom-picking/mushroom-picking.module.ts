import { Module } from '@nestjs/common';
import { MushroomPickingController } from './mushroom-picking.controller';
import { MushroomPickingService } from './mushroom-picking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MushroomPicking } from './mushroom-picking.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MushroomPicking]), UserModule],
  controllers: [MushroomPickingController],
  providers: [MushroomPickingService],
  exports: [MushroomPickingService],
})
export class MushroomPickingModule {}
