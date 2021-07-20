import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInfoController } from './organization-info.controller';
import { OrganizationInfoService } from './organization-info.service';

describe('OrganizationInfoController', () => {
  let controller: OrganizationInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationInfoController],
      providers: [OrganizationInfoService],
    }).compile();

    controller = module.get<OrganizationInfoController>(OrganizationInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
