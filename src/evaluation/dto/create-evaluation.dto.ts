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

export class CreateEvaluationDto {
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
    name: 'date',
    description: '',
    example: '2023-05-17',
    isArray: false,
    default: '2023-05-17',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    type: 'string',
    name: 'commentaire',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  commentaire: string;

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
    name: 'note',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  note: number;
}
