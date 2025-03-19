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
import { Prisma, Transaction } from '@prisma/client';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { TransactionExample, TransactionEntity } from './data/transaction.data';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @ApiResponse({
    status: 201,
    description: 'transaction successfully created',
    type: TransactionEntity,
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
    type: CreateTransactionDto,
    examples: {
      exemple1: {
        summary: 'Example of Transaction fields',
        value: TransactionExample,
        description: 'Transaction fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateTransaction',
    summary: 'Create a new transaction record',
    description: 'Adds a new transaction to the system with the provided data.',
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
  create(@Body() dto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Transaction retrieved successfully.',
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
    operationId: 'GetAllTransaction',
    summary: 'Retrieve multiple Transaction',
    description:
      'Fetch a list of Transaction with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Transaction to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Transaction to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.TransactionWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Transaction[]>> {
    return this.transactionService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Transaction retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Transaction ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Transaction not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneTransaction',
    summary: 'Retrieve a single Transaction',
    description: 'Fetch details of a single Transaction by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Transaction',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Transaction | null> {
    return this.transactionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Transaction successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Transaction found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateTransactionDto })
  @ApiOperation({
    operationId: 'UpdateTransaction',
    summary: 'Update an existing Transaction record',
    description:
      'Update an existing Transaction to the system with the provided data.',
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
    description: 'The unique identifier of Transaction',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Transaction deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Transaction ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Transaction found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteTransaction',
    summary: 'Delete a transaction',
    description:
      'Remove a transaction from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the transaction to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.delete(id);
  }
}
