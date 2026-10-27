import { Test, TestingModule } from '@nestjs/testing';
import { TowersService } from './towers.service';

describe('TowersService', () => {
  let service: TowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TowersService],
    }).compile();

    service = module.get<TowersService>(TowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
