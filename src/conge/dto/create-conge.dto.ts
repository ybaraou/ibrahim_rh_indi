import { CONGES_STATUS } from '@prisma/client';
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

export class CreateCongeDto {
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
    name: 'dateDebut',
    description: '',
    example: '2023-05-17',
    isArray: false,
    default: '2023-05-17',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateDebut: Date;

  @ApiProperty({
    type: 'string',
    name: 'dateFin',
    description: '',
    example: '2023-05-17',
    isArray: false,
    default: '2023-05-17',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateFin: Date;

  @ApiProperty({
    enum: CONGES_STATUS,
    enumName: 'status',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsEnum(CONGES_STATUS, { message: 'status should be enum: CONGES_STATUS' })
  @IsNotEmpty()
  status: CONGES_STATUS;
}
