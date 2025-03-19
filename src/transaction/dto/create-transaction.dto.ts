import { TRANSACTION_STATUS } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsDate,
  IsOptional,
  IsNumber,
  IsArray,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  IsEnum,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({
    type: 'string',
    name: 'libelle',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  libelle: string;

  @ApiProperty({
    type: 'number',
    name: 'montant',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  montant: number;

  @ApiProperty({
    type: 'string',
    name: 'modePaiementId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  modePaiementId: string;

  @ApiProperty({
    type: 'string',
    name: 'recuParId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  recuParId: string;

  @ApiProperty({
    type: 'string',
    name: 'envoyerParId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  envoyerParId: string;

  @ApiProperty({
    enum: TRANSACTION_STATUS,
    enumName: 'status',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsEnum(TRANSACTION_STATUS, {
    message: 'status should be enum: TRANSACTION_STATUS',
  })
  @IsNotEmpty()
  status: TRANSACTION_STATUS;
}
