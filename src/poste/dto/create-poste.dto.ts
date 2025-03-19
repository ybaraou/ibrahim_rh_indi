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

export class CreatePosteDto {
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
    name: 'departementId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  departementId: string;
}
