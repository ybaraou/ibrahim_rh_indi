import { DOCUMENT_STATUS } from '@prisma/client';
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

export class CreateDocumentDto {
  @ApiProperty({
    type: 'string',
    name: 'employeId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  employeId: string;

  @ApiProperty({
    type: 'string',
    name: 'nom',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({
    type: 'string',
    name: 'urlFichier',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  urlFichier: string;

  @ApiProperty({
    enum: DOCUMENT_STATUS,
    enumName: 'status',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsEnum(DOCUMENT_STATUS, {
    message: 'status should be enum: DOCUMENT_STATUS',
  })
  @IsNotEmpty()
  status: DOCUMENT_STATUS;
}
