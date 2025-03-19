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
import { Prisma, GestionLog } from '@prisma/client';
import { GestionLogService } from './gestionlog.service';
import { CreateGestionLogDto } from './dto/create-gestionlog.dto';
import { UpdateGestionLogDto } from './dto/update-gestionlog.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { GestionLogExample, GestionLogEntity } from './data/gestionlog.data';

@ApiTags('gestionlog')
@Controller('gestionlog')
export class GestionLogController {
  constructor(private gestionlogService: GestionLogService) {}

  @ApiResponse({
    status: 201,
    description: 'gestionlog successfully created',
    type: GestionLogEntity,
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
    type: CreateGestionLogDto,
    examples: {
      exemple1: {
        summary: 'Example of GestionLog fields',
        value: GestionLogExample,
        description: 'GestionLog fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateGestionLog',
    summary: 'Create a new gestionlog record',
    description: 'Adds a new gestionlog to the system with the provided data.',
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
  create(@Body() dto: CreateGestionLogDto): Promise<GestionLog> {
    return this.gestionlogService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of GestionLog retrieved successfully.',
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
    operationId: 'GetAllGestionLog',
    summary: 'Retrieve multiple GestionLog',
    description:
      'Fetch a list of GestionLog with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of GestionLog to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of GestionLog to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.GestionLogWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<GestionLog[]>> {
    return this.gestionlogService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'GestionLog retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid GestionLog ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - GestionLog not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneGestionLog',
    summary: 'Retrieve a single GestionLog',
    description: 'Fetch details of a single GestionLog by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of GestionLog',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GestionLog | null> {
    return this.gestionlogService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'GestionLog successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No GestionLog found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateGestionLogDto })
  @ApiOperation({
    operationId: 'UpdateGestionLog',
    summary: 'Update an existing GestionLog record',
    description:
      'Update an existing GestionLog to the system with the provided data.',
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
    description: 'The unique identifier of GestionLog',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGestionLogDto,
  ): Promise<GestionLog> {
    return this.gestionlogService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'GestionLog deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid GestionLog ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No GestionLog found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteGestionLog',
    summary: 'Delete a gestionlog',
    description: 'Remove a gestionlog from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the gestionlog to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<GestionLog> {
    return this.gestionlogService.delete(id);
  }
}
