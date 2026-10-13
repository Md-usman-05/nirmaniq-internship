import { Test, TestingModule } from '@nestjs/testing';
import { TowersController } from './towers.controller';

describe('TowersController', () => {
  let controller: TowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TowersController],
    }).compile();

    controller = module.get<TowersController>(TowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
