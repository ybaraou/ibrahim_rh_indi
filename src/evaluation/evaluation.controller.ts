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
import { Prisma, Evaluation } from '@prisma/client';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { EvaluationExample, EvaluationEntity } from './data/evaluation.data';

@ApiTags('evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private evaluationService: EvaluationService) {}

  @ApiResponse({
    status: 201,
    description: 'evaluation successfully created',
    type: EvaluationEntity,
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
    type: CreateEvaluationDto,
    examples: {
      exemple1: {
        summary: 'Example of Evaluation fields',
        value: EvaluationExample,
        description: 'Evaluation fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateEvaluation',
    summary: 'Create a new evaluation record',
    description: 'Adds a new evaluation to the system with the provided data.',
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
  create(@Body() dto: CreateEvaluationDto): Promise<Evaluation> {
    return this.evaluationService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Evaluation retrieved successfully.',
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
    operationId: 'GetAllEvaluation',
    summary: 'Retrieve multiple Evaluation',
    description:
      'Fetch a list of Evaluation with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Evaluation to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Evaluation to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.EvaluationWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Evaluation[]>> {
    return this.evaluationService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Evaluation retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Evaluation ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Evaluation not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneEvaluation',
    summary: 'Retrieve a single Evaluation',
    description: 'Fetch details of a single Evaluation by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Evaluation',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Evaluation | null> {
    return this.evaluationService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Evaluation successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Evaluation found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateEvaluationDto })
  @ApiOperation({
    operationId: 'UpdateEvaluation',
    summary: 'Update an existing Evaluation record',
    description:
      'Update an existing Evaluation to the system with the provided data.',
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
    description: 'The unique identifier of Evaluation',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    return this.evaluationService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Evaluation deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Evaluation ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Evaluation found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteEvaluation',
    summary: 'Delete a evaluation',
    description: 'Remove a evaluation from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the evaluation to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Evaluation> {
    return this.evaluationService.delete(id);
  }
}
