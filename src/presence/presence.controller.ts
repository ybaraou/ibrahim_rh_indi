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
import { Prisma, Presence } from '@prisma/client';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { PresenceExample, PresenceEntity } from './data/presence.data';

@ApiTags('presence')
@Controller('presence')
export class PresenceController {
  constructor(private presenceService: PresenceService) {}

  @ApiResponse({
    status: 201,
    description: 'presence successfully created',
    type: PresenceEntity,
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
    type: CreatePresenceDto,
    examples: {
      exemple1: {
        summary: 'Example of Presence fields',
        value: PresenceExample,
        description: 'Presence fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreatePresence',
    summary: 'Create a new presence record',
    description: 'Adds a new presence to the system with the provided data.',
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
  create(@Body() dto: CreatePresenceDto): Promise<Presence> {
    return this.presenceService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Presence retrieved successfully.',
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
    operationId: 'GetAllPresence',
    summary: 'Retrieve multiple Presence',
    description:
      'Fetch a list of Presence with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Presence to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Presence to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.PresenceWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Presence[]>> {
    return this.presenceService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Presence retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Presence ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Presence not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOnePresence',
    summary: 'Retrieve a single Presence',
    description: 'Fetch details of a single Presence by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Presence',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Presence | null> {
    return this.presenceService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Presence successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Presence found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdatePresenceDto })
  @ApiOperation({
    operationId: 'UpdatePresence',
    summary: 'Update an existing Presence record',
    description:
      'Update an existing Presence to the system with the provided data.',
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
    description: 'The unique identifier of Presence',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePresenceDto,
  ): Promise<Presence> {
    return this.presenceService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Presence deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Presence ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Presence found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeletePresence',
    summary: 'Delete a presence',
    description: 'Remove a presence from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the presence to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Presence> {
    return this.presenceService.delete(id);
  }
}
