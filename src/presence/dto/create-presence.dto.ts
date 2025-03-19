import { PRESENCE_STATUS } from '@prisma/client';
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

export class CreatePresenceDto {
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
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    type: 'string',
    name: 'heureArrivee',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  heureArrivee: string;

  @ApiProperty({
    type: 'string',
    name: 'heureDepart',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  heureDepart: string;

  @ApiProperty({
    enum: PRESENCE_STATUS,
    enumName: 'status',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsEnum(PRESENCE_STATUS, {
    message: 'status should be enum: PRESENCE_STATUS',
  })
  @IsNotEmpty()
  status: PRESENCE_STATUS;
}
