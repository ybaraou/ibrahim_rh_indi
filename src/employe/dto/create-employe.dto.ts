import { EMPLOYE_STATUS } from '@prisma/client';
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

export class CreateEmployeDto {
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
    name: 'prenom',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  prenom: string;

  @ApiProperty({
    type: 'string',
    name: 'email',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    name: 'telephone',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  telephone: string;

  @ApiProperty({
    type: 'string',
    name: 'date_naissance',
    description: '',
    example: '2023-05-17',
    isArray: false,
    default: '2023-05-17',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date_naissance: Date;

  @ApiProperty({
    type: 'string',
    name: 'posteId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  posteId: string;

  @ApiProperty({
    type: 'string',
    name: 'roleId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  roleId: string;

  @ApiProperty({
    type: 'string',
    name: 'typeEmployeId',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsOptional()
  typeEmployeId: string;

  @ApiProperty({
    type: 'number',
    name: 'salaire',
    description: '',
    example: 10,
    isArray: false,
    default: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  salaire: number;

  @ApiProperty({
    type: 'string',
    name: 'dateEmbauche',
    description: '',
    example: '2023-05-17',
    isArray: false,
    default: '2023-05-17',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateEmbauche: Date;

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

  @ApiProperty({
    enum: EMPLOYE_STATUS,
    enumName: 'status',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsEnum(EMPLOYE_STATUS, { message: 'status should be enum: EMPLOYE_STATUS' })
  @IsNotEmpty()
  status: EMPLOYE_STATUS;

  @ApiProperty({
    type: 'string',
    name: 'password',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: 'string',
    name: 'token',
    description: '',
    example: '',
    isArray: false,
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
