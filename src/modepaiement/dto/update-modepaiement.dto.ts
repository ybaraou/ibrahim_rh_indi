import { PartialType } from '@nestjs/mapped-types';
import { CreateModePaiementDto } from './create-modepaiement.dto';

export class UpdateModePaiementDto extends PartialType(CreateModePaiementDto) {}
