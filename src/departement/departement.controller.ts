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
import { Prisma, Departement } from '@prisma/client';
import { DepartementService } from './departement.service';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { DepartementExample, DepartementEntity } from './data/departement.data';

@ApiTags('departement')
@Controller('departement')
export class DepartementController {
  constructor(private departementService: DepartementService) {}

  @ApiResponse({
    status: 201,
    description: 'departement successfully created',
    type: DepartementEntity,
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
    type: CreateDepartementDto,
    examples: {
      exemple1: {
        summary: 'Example of Departement fields',
        value: DepartementExample,
        description: 'Departement fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateDepartement',
    summary: 'Create a new departement record',
    description: 'Adds a new departement to the system with the provided data.',
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
  create(@Body() dto: CreateDepartementDto): Promise<Departement> {
    return this.departementService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Departement retrieved successfully.',
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
    operationId: 'GetAllDepartement',
    summary: 'Retrieve multiple Departement',
    description:
      'Fetch a list of Departement with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Departement to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Departement to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.DepartementWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Departement[]>> {
    return this.departementService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Departement retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Departement ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Departement not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneDepartement',
    summary: 'Retrieve a single Departement',
    description: 'Fetch details of a single Departement by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Departement',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Departement | null> {
    return this.departementService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Departement successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Departement found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateDepartementDto })
  @ApiOperation({
    operationId: 'UpdateDepartement',
    summary: 'Update an existing Departement record',
    description:
      'Update an existing Departement to the system with the provided data.',
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
    description: 'The unique identifier of Departement',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartementDto,
  ): Promise<Departement> {
    return this.departementService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Departement deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Departement ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Departement found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteDepartement',
    summary: 'Delete a departement',
    description:
      'Remove a departement from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the departement to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Departement> {
    return this.departementService.delete(id);
  }
}
