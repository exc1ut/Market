import { Module } from '@nestjs/common';
import { OrganizationInfoService } from './organization-info.service';
import { OrganizationInfoController } from './organization-info.controller';

@Module({
  controllers: [OrganizationInfoController],
  providers: [OrganizationInfoService]
})
export class OrganizationInfoModule {}
