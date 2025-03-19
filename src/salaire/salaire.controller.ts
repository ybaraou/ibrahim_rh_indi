import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Put,
  Req,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma, Salaire } from '@prisma/client';
import { SalaireService } from './salaire.service';
import { CreateSalaireDto } from './dto/create-salaire.dto';
import { UpdateSalaireDto } from './dto/update-salaire.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { SalaireExample, SalaireEntity } from './data/salaire.data';

@ApiTags('salaire')
@Controller('salaire')
export class SalaireController {
  constructor(private salaireService: SalaireService) {}

  @ApiResponse({
    status: 201,
    description: 'salaire successfully created',
    type: SalaireEntity,
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request - The request contains invalid data or missing required fields.',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({
    type: CreateSalaireDto,
    examples: {
      exemple1: {
        summary: 'Example of Salaire fields',
        value: SalaireExample,
        description: 'Salaire fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateSalaire',
    summary: 'Create a new salaire record',
    description: 'Adds a new salaire to the system with the provided data.',
    requestBody: {
      content: {
        'multipart/form-data': {
          encoding: {
            about: {
              contentType: 'application/json',
            },
          },
          schema: {
            type: 'object',
            properties: {
              about: { type: 'array', items: { type: 'number' } },
            },
          },
        },
      },
    },
  })
  @Post('')
  create(@Body() dto: CreateSalaireDto): Promise<Salaire> {
    return this.salaireService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Salaire retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid query parameters.',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetAllSalaire',
    summary: 'Retrieve multiple Salaire',
    description:
      'Fetch a list of Salaire with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Salaire to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Salaire to return',
  })
  @ApiQuery({
    name: 'cursor',
    required: false,
    type: 'string',
    description: 'Cursor for pagination',
  })
  @ApiQuery({
    name: 'where',
    required: false,
    type: 'string',
    description: 'Filtre of results',
  })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    type: 'string',
    description: 'Sort order (e.g., name:asc, createdAt:desc)',
  })
  @Get('')
  getMany(
    @Query('skip', OptionalIntPipe) skip?: number,
    @Query('take', OptionalIntPipe) take?: number,
    @Query('cursor', CursorPipe) cursor?: Prisma.SalaireWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Salaire[]>> {
    return this.salaireService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Salaire retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Salaire ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Salaire not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneSalaire',
    summary: 'Retrieve a single Salaire',
    description: 'Fetch details of a single Salaire by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Salaire',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Salaire | null> {
    return this.salaireService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Salaire successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Salaire found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateSalaireDto })
  @ApiOperation({
    operationId: 'UpdateSalaire',
    summary: 'Update an existing Salaire record',
    description:
      'Update an existing Salaire to the system with the provided data.',
    requestBody: {
      content: {
        'multipart/form-data': {
          encoding: {
            about: {
              contentType: 'application/json',
            },
          },
          schema: {
            type: 'object',
            properties: {
              about: { type: 'array', items: { type: 'number' } },
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Salaire',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSalaireDto,
  ): Promise<Salaire> {
    return this.salaireService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Salaire deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Salaire ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Salaire found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteSalaire',
    summary: 'Delete a salaire',
    description: 'Remove a salaire from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the salaire to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Salaire> {
    return this.salaireService.delete(id);
  }
}
