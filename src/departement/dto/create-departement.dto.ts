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

export class CreateDepartementDto {
  @ApiProperty({
    type: 'string',
    name: 'responsableId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  responsableId: string;

  @ApiProperty({
    type: 'string',
    name: 'name',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
