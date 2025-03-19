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
import { Prisma, HistoriqueSalaire } from '@prisma/client';
import { HistoriqueSalaireService } from './historiquesalaire.service';
import { CreateHistoriqueSalaireDto } from './dto/create-historiquesalaire.dto';
import { UpdateHistoriqueSalaireDto } from './dto/update-historiquesalaire.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import {
  HistoriqueSalaireExample,
  HistoriqueSalaireEntity,
} from './data/historiquesalaire.data';

@ApiTags('historiquesalaire')
@Controller('historiquesalaire')
export class HistoriqueSalaireController {
  constructor(private historiquesalaireService: HistoriqueSalaireService) {}

  @ApiResponse({
    status: 201,
    description: 'historiquesalaire successfully created',
    type: HistoriqueSalaireEntity,
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
    type: CreateHistoriqueSalaireDto,
    examples: {
      exemple1: {
        summary: 'Example of HistoriqueSalaire fields',
        value: HistoriqueSalaireExample,
        description: 'HistoriqueSalaire fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateHistoriqueSalaire',
    summary: 'Create a new historiquesalaire record',
    description:
      'Adds a new historiquesalaire to the system with the provided data.',
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
  create(@Body() dto: CreateHistoriqueSalaireDto): Promise<HistoriqueSalaire> {
    return this.historiquesalaireService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of HistoriqueSalaire retrieved successfully.',
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
    operationId: 'GetAllHistoriqueSalaire',
    summary: 'Retrieve multiple HistoriqueSalaire',
    description:
      'Fetch a list of HistoriqueSalaire with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of HistoriqueSalaire to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of HistoriqueSalaire to return',
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
    @Query('cursor', CursorPipe)
    cursor?: Prisma.HistoriqueSalaireWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<HistoriqueSalaire[]>> {
    return this.historiquesalaireService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'HistoriqueSalaire retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid HistoriqueSalaire ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - HistoriqueSalaire not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneHistoriqueSalaire',
    summary: 'Retrieve a single HistoriqueSalaire',
    description:
      'Fetch details of a single HistoriqueSalaire by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of HistoriqueSalaire',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<HistoriqueSalaire | null> {
    return this.historiquesalaireService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'HistoriqueSalaire successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No HistoriqueSalaire found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateHistoriqueSalaireDto })
  @ApiOperation({
    operationId: 'UpdateHistoriqueSalaire',
    summary: 'Update an existing HistoriqueSalaire record',
    description:
      'Update an existing HistoriqueSalaire to the system with the provided data.',
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
    description: 'The unique identifier of HistoriqueSalaire',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHistoriqueSalaireDto,
  ): Promise<HistoriqueSalaire> {
    return this.historiquesalaireService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'HistoriqueSalaire deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid HistoriqueSalaire ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No HistoriqueSalaire found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteHistoriqueSalaire',
    summary: 'Delete a historiquesalaire',
    description:
      'Remove a historiquesalaire from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the historiquesalaire to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<HistoriqueSalaire> {
    return this.historiquesalaireService.delete(id);
  }
}
