import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationInfoService } from './organization-info.service';
import { CreateOrganizationInfoDto } from './dto/create-organization-info.dto';
import { UpdateOrganizationInfoDto } from './dto/update-organization-info.dto';

@Controller('organization-info')
export class OrganizationInfoController {
  constructor(private readonly organizationInfoService: OrganizationInfoService) {}

  @Post()
  create(@Body() createOrganizationInfoDto: CreateOrganizationInfoDto) {
    return this.organizationInfoService.create(createOrganizationInfoDto);
  }

  @Get()
  findAll() {
    return this.organizationInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationInfoDto: UpdateOrganizationInfoDto) {
    return this.organizationInfoService.update(+id, updateOrganizationInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationInfoService.remove(+id);
  }
}
