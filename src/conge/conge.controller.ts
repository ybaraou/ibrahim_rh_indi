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
import { Prisma, Conge } from '@prisma/client';
import { CongeService } from './conge.service';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { CongeExample, CongeEntity } from './data/conge.data';

@ApiTags('conge')
@Controller('conge')
export class CongeController {
  constructor(private congeService: CongeService) {}

  @ApiResponse({
    status: 201,
    description: 'conge successfully created',
    type: CongeEntity,
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
    type: CreateCongeDto,
    examples: {
      exemple1: {
        summary: 'Example of Conge fields',
        value: CongeExample,
        description: 'Conge fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateConge',
    summary: 'Create a new conge record',
    description: 'Adds a new conge to the system with the provided data.',
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
  create(@Body() dto: CreateCongeDto): Promise<Conge> {
    return this.congeService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Conge retrieved successfully.',
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
    operationId: 'GetAllConge',
    summary: 'Retrieve multiple Conge',
    description:
      'Fetch a list of Conge with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Conge to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Conge to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.CongeWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Conge[]>> {
    return this.congeService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Conge retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid Conge ID.' })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Conge not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneConge',
    summary: 'Retrieve a single Conge',
    description: 'Fetch details of a single Conge by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Conge',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Conge | null> {
    return this.congeService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Conge successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Conge found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateCongeDto })
  @ApiOperation({
    operationId: 'UpdateConge',
    summary: 'Update an existing Conge record',
    description:
      'Update an existing Conge to the system with the provided data.',
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
    description: 'The unique identifier of Conge',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCongeDto): Promise<Conge> {
    return this.congeService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Conge deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Conge ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Conge found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteConge',
    summary: 'Delete a conge',
    description: 'Remove a conge from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the conge to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Conge> {
    return this.congeService.delete(id);
  }
}
