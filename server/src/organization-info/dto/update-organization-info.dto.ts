import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationInfoDto } from './create-organization-info.dto';

export class UpdateOrganizationInfoDto extends PartialType(CreateOrganizationInfoDto) {}
