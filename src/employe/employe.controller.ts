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
import { Prisma, Employe } from '@prisma/client';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { EmployeExample, EmployeEntity } from './data/employe.data';

@ApiTags('employe')
@Controller('employe')
export class EmployeController {
  constructor(private employeService: EmployeService) {}

  @ApiResponse({
    status: 201,
    description: 'employe successfully created',
    type: EmployeEntity,
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
    type: CreateEmployeDto,
    examples: {
      exemple1: {
        summary: 'Example of Employe fields',
        value: EmployeExample,
        description: 'Employe fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateEmploye',
    summary: 'Create a new employe record',
    description: 'Adds a new employe to the system with the provided data.',
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
  create(@Body() dto: CreateEmployeDto): Promise<Employe> {
    return this.employeService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Employe retrieved successfully.',
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
    operationId: 'GetAllEmploye',
    summary: 'Retrieve multiple Employe',
    description:
      'Fetch a list of Employe with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Employe to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Employe to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.EmployeWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Employe[]>> {
    return this.employeService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Employe retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Employe ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Employe not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneEmploye',
    summary: 'Retrieve a single Employe',
    description: 'Fetch details of a single Employe by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Employe',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Employe | null> {
    return this.employeService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Employe successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Employe found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateEmployeDto })
  @ApiOperation({
    operationId: 'UpdateEmploye',
    summary: 'Update an existing Employe record',
    description:
      'Update an existing Employe to the system with the provided data.',
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
    description: 'The unique identifier of Employe',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeDto,
  ): Promise<Employe> {
    return this.employeService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Employe deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Employe ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Employe found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteEmploye',
    summary: 'Delete a employe',
    description: 'Remove a employe from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the employe to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Employe> {
    return this.employeService.delete(id);
  }
}
