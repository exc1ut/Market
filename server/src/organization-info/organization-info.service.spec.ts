import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationInfoService } from './organization-info.service';

describe('OrganizationInfoService', () => {
  let service: OrganizationInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationInfoService],
    }).compile();

    service = module.get<OrganizationInfoService>(OrganizationInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
