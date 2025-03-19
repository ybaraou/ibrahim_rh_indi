import { PartialType } from '@nestjs/mapped-types';
import { CreateGestionLogDto } from './create-gestionlog.dto';

export class UpdateGestionLogDto extends PartialType(CreateGestionLogDto) {}
