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

export class CreateSalaireDto {
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
    type: 'number',
    name: 'salaireBrut',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  salaireBrut: number;

  @ApiProperty({
    type: 'number',
    name: 'deductions',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  deductions: number;

  @ApiProperty({
    type: 'number',
    name: 'salaireNet',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  salaireNet: number;
}
