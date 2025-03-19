import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeEmployeDto } from './create-typeemploye.dto';

export class UpdateTypeEmployeDto extends PartialType(CreateTypeEmployeDto) {}
