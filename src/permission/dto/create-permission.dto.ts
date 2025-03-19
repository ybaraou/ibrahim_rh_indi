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

export class CreatePermissionDto {
  @ApiProperty({
    type: 'string',
    name: 'codePermission',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  codePermission: string;

  @ApiProperty({
    type: 'string',
    name: 'namePermission',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  namePermission: string;

  @ApiProperty({
    type: 'string',
    name: 'group',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  group: string;
}
