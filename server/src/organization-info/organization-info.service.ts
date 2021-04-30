import { Injectable } from '@nestjs/common';
import { CreateOrganizationInfoDto } from './dto/create-organization-info.dto';
import { UpdateOrganizationInfoDto } from './dto/update-organization-info.dto';

@Injectable()
export class OrganizationInfoService {
  create(createOrganizationInfoDto: CreateOrganizationInfoDto) {
    return 'This action adds a new organizationInfo';
  }

  findAll() {
    return `This action returns all organizationInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationInfo`;
  }

  update(id: number, updateOrganizationInfoDto: UpdateOrganizationInfoDto) {
    return `This action updates a #${id} organizationInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationInfo`;
  }
}
