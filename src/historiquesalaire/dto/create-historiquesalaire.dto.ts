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

export class CreateHistoriqueSalaireDto {
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
}
