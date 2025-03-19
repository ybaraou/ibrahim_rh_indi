import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriqueSalaireDto } from './create-historiquesalaire.dto';

export class UpdateHistoriqueSalaireDto extends PartialType(
  CreateHistoriqueSalaireDto,
) {}
