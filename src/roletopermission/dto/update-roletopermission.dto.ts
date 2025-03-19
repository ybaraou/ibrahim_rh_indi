import { PartialType } from '@nestjs/mapped-types';
import { CreateRoletoPermissionDto } from './create-roletopermission.dto';

export class UpdateRoletoPermissionDto extends PartialType(
  CreateRoletoPermissionDto,
) {}
