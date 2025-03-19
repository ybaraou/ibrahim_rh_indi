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

export class CreateGestionLogDto {
  @ApiProperty({
    type: 'string',
    name: 'labelle',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  labelle: string;

  @ApiProperty({
    type: 'string',
    name: 'action',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  action: string;

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
}
