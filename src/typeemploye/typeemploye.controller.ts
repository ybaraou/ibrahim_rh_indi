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
import { Prisma, TypeEmploye } from '@prisma/client';
import { TypeEmployeService } from './typeemploye.service';
import { CreateTypeEmployeDto } from './dto/create-typeemploye.dto';
import { UpdateTypeEmployeDto } from './dto/update-typeemploye.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { TypeEmployeExample, TypeEmployeEntity } from './data/typeemploye.data';

@ApiTags('typeemploye')
@Controller('typeemploye')
export class TypeEmployeController {
  constructor(private typeemployeService: TypeEmployeService) {}

  @ApiResponse({
    status: 201,
    description: 'typeemploye successfully created',
    type: TypeEmployeEntity,
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
    type: CreateTypeEmployeDto,
    examples: {
      exemple1: {
        summary: 'Example of TypeEmploye fields',
        value: TypeEmployeExample,
        description: 'TypeEmploye fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateTypeEmploye',
    summary: 'Create a new typeemploye record',
    description: 'Adds a new typeemploye to the system with the provided data.',
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
  create(@Body() dto: CreateTypeEmployeDto): Promise<TypeEmploye> {
    return this.typeemployeService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of TypeEmploye retrieved successfully.',
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
    operationId: 'GetAllTypeEmploye',
    summary: 'Retrieve multiple TypeEmploye',
    description:
      'Fetch a list of TypeEmploye with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of TypeEmploye to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of TypeEmploye to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.TypeEmployeWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<TypeEmploye[]>> {
    return this.typeemployeService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'TypeEmploye retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid TypeEmploye ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - TypeEmploye not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneTypeEmploye',
    summary: 'Retrieve a single TypeEmploye',
    description: 'Fetch details of a single TypeEmploye by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of TypeEmploye',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TypeEmploye | null> {
    return this.typeemployeService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'TypeEmploye successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No TypeEmploye found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateTypeEmployeDto })
  @ApiOperation({
    operationId: 'UpdateTypeEmploye',
    summary: 'Update an existing TypeEmploye record',
    description:
      'Update an existing TypeEmploye to the system with the provided data.',
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
    description: 'The unique identifier of TypeEmploye',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTypeEmployeDto,
  ): Promise<TypeEmploye> {
    return this.typeemployeService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'TypeEmploye deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid TypeEmploye ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No TypeEmploye found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteTypeEmploye',
    summary: 'Delete a typeemploye',
    description:
      'Remove a typeemploye from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the typeemploye to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<TypeEmploye> {
    return this.typeemployeService.delete(id);
  }
}
