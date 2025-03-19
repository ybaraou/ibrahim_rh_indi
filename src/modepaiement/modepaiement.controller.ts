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
import { Prisma, ModePaiement } from '@prisma/client';
import { ModePaiementService } from './modepaiement.service';
import { CreateModePaiementDto } from './dto/create-modepaiement.dto';
import { UpdateModePaiementDto } from './dto/update-modepaiement.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import {
  ModePaiementExample,
  ModePaiementEntity,
} from './data/modepaiement.data';

@ApiTags('modepaiement')
@Controller('modepaiement')
export class ModePaiementController {
  constructor(private modepaiementService: ModePaiementService) {}

  @ApiResponse({
    status: 201,
    description: 'modepaiement successfully created',
    type: ModePaiementEntity,
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
    type: CreateModePaiementDto,
    examples: {
      exemple1: {
        summary: 'Example of ModePaiement fields',
        value: ModePaiementExample,
        description: 'ModePaiement fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateModePaiement',
    summary: 'Create a new modepaiement record',
    description:
      'Adds a new modepaiement to the system with the provided data.',
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
  create(@Body() dto: CreateModePaiementDto): Promise<ModePaiement> {
    return this.modepaiementService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of ModePaiement retrieved successfully.',
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
    operationId: 'GetAllModePaiement',
    summary: 'Retrieve multiple ModePaiement',
    description:
      'Fetch a list of ModePaiement with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of ModePaiement to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of ModePaiement to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.ModePaiementWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<ModePaiement[]>> {
    return this.modepaiementService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'ModePaiement retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid ModePaiement ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - ModePaiement not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneModePaiement',
    summary: 'Retrieve a single ModePaiement',
    description: 'Fetch details of a single ModePaiement by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of ModePaiement',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ModePaiement | null> {
    return this.modepaiementService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'ModePaiement successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No ModePaiement found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateModePaiementDto })
  @ApiOperation({
    operationId: 'UpdateModePaiement',
    summary: 'Update an existing ModePaiement record',
    description:
      'Update an existing ModePaiement to the system with the provided data.',
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
    description: 'The unique identifier of ModePaiement',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateModePaiementDto,
  ): Promise<ModePaiement> {
    return this.modepaiementService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'ModePaiement deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid ModePaiement ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No ModePaiement found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteModePaiement',
    summary: 'Delete a modepaiement',
    description:
      'Remove a modepaiement from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the modepaiement to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<ModePaiement> {
    return this.modepaiementService.delete(id);
  }
}
