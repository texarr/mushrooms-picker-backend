import { Test, TestingModule } from '@nestjs/testing';
import { MushroomPickingController } from './mushroom-picking.controller';

describe('MushroomPickingController', () => {
  let controller: MushroomPickingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MushroomPickingController],
    }).compile();

    controller = module.get<MushroomPickingController>(MushroomPickingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
