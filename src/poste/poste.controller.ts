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
import { Prisma, Poste } from '@prisma/client';
import { PosteService } from './poste.service';
import { CreatePosteDto } from './dto/create-poste.dto';
import { UpdatePosteDto } from './dto/update-poste.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { PosteExample, PosteEntity } from './data/poste.data';

@ApiTags('poste')
@Controller('poste')
export class PosteController {
  constructor(private posteService: PosteService) {}

  @ApiResponse({
    status: 201,
    description: 'poste successfully created',
    type: PosteEntity,
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
    type: CreatePosteDto,
    examples: {
      exemple1: {
        summary: 'Example of Poste fields',
        value: PosteExample,
        description: 'Poste fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreatePoste',
    summary: 'Create a new poste record',
    description: 'Adds a new poste to the system with the provided data.',
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
  create(@Body() dto: CreatePosteDto): Promise<Poste> {
    return this.posteService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Poste retrieved successfully.',
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
    operationId: 'GetAllPoste',
    summary: 'Retrieve multiple Poste',
    description:
      'Fetch a list of Poste with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Poste to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Poste to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.PosteWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Poste[]>> {
    return this.posteService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Poste retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid Poste ID.' })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Poste not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOnePoste',
    summary: 'Retrieve a single Poste',
    description: 'Fetch details of a single Poste by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Poste',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Poste | null> {
    return this.posteService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Poste successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Poste found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdatePosteDto })
  @ApiOperation({
    operationId: 'UpdatePoste',
    summary: 'Update an existing Poste record',
    description:
      'Update an existing Poste to the system with the provided data.',
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
    description: 'The unique identifier of Poste',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePosteDto): Promise<Poste> {
    return this.posteService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Poste deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Poste ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Poste found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeletePoste',
    summary: 'Delete a poste',
    description: 'Remove a poste from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the poste to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Poste> {
    return this.posteService.delete(id);
  }
}
