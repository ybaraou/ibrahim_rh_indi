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
import { Prisma, Permission } from '@prisma/client';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { PermissionExample, PermissionEntity } from './data/permission.data';

@ApiTags('permission')
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @ApiResponse({
    status: 201,
    description: 'permission successfully created',
    type: PermissionEntity,
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
    type: CreatePermissionDto,
    examples: {
      exemple1: {
        summary: 'Example of Permission fields',
        value: PermissionExample,
        description: 'Permission fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreatePermission',
    summary: 'Create a new permission record',
    description: 'Adds a new permission to the system with the provided data.',
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
  create(@Body() dto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Permission retrieved successfully.',
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
    operationId: 'GetAllPermission',
    summary: 'Retrieve multiple Permission',
    description:
      'Fetch a list of Permission with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Permission to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Permission to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.PermissionWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Permission[]>> {
    return this.permissionService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Permission retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Permission ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Permission not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOnePermission',
    summary: 'Retrieve a single Permission',
    description: 'Fetch details of a single Permission by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Permission',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Permission | null> {
    return this.permissionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Permission successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Permission found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdatePermissionDto })
  @ApiOperation({
    operationId: 'UpdatePermission',
    summary: 'Update an existing Permission record',
    description:
      'Update an existing Permission to the system with the provided data.',
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
    description: 'The unique identifier of Permission',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePermissionDto,
  ): Promise<Permission> {
    return this.permissionService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Permission deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Permission ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Permission found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeletePermission',
    summary: 'Delete a permission',
    description: 'Remove a permission from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the permission to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Permission> {
    return this.permissionService.delete(id);
  }
}
