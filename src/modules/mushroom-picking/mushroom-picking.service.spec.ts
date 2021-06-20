import { Test, TestingModule } from '@nestjs/testing';
import { MushroomPickingService } from './mushroom-picking.service';

describe('MushroomPickingService', () => {
  let service: MushroomPickingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MushroomPickingService],
    }).compile();

    service = module.get<MushroomPickingService>(MushroomPickingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
