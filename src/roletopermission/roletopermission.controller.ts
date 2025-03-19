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
import { Prisma, RoletoPermission } from '@prisma/client';
import { RoletoPermissionService } from './roletopermission.service';
import { CreateRoletoPermissionDto } from './dto/create-roletopermission.dto';
import { UpdateRoletoPermissionDto } from './dto/update-roletopermission.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import {
  RoletoPermissionExample,
  RoletoPermissionEntity,
} from './data/roletopermission.data';

@ApiTags('roletopermission')
@Controller('roletopermission')
export class RoletoPermissionController {
  constructor(private roletopermissionService: RoletoPermissionService) {}

  @ApiResponse({
    status: 201,
    description: 'roletopermission successfully created',
    type: RoletoPermissionEntity,
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
    type: CreateRoletoPermissionDto,
    examples: {
      exemple1: {
        summary: 'Example of RoletoPermission fields',
        value: RoletoPermissionExample,
        description: 'RoletoPermission fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateRoletoPermission',
    summary: 'Create a new roletopermission record',
    description:
      'Adds a new roletopermission to the system with the provided data.',
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
  create(@Body() dto: CreateRoletoPermissionDto): Promise<RoletoPermission> {
    return this.roletopermissionService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of RoletoPermission retrieved successfully.',
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
    operationId: 'GetAllRoletoPermission',
    summary: 'Retrieve multiple RoletoPermission',
    description:
      'Fetch a list of RoletoPermission with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of RoletoPermission to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of RoletoPermission to return',
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
    cursor?: Prisma.RoletoPermissionWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<RoletoPermission[]>> {
    return this.roletopermissionService.findAll({
      cursor,
      orderBy,
      skip,
      take,
      where,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'RoletoPermission retrieved successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid RoletoPermission ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - RoletoPermission not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneRoletoPermission',
    summary: 'Retrieve a single RoletoPermission',
    description:
      'Fetch details of a single RoletoPermission by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of RoletoPermission',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoletoPermission | null> {
    return this.roletopermissionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'RoletoPermission successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No RoletoPermission found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateRoletoPermissionDto })
  @ApiOperation({
    operationId: 'UpdateRoletoPermission',
    summary: 'Update an existing RoletoPermission record',
    description:
      'Update an existing RoletoPermission to the system with the provided data.',
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
    description: 'The unique identifier of RoletoPermission',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRoletoPermissionDto,
  ): Promise<RoletoPermission> {
    return this.roletopermissionService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'RoletoPermission deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid RoletoPermission ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No RoletoPermission found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteRoletoPermission',
    summary: 'Delete a roletopermission',
    description:
      'Remove a roletopermission from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the roletopermission to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<RoletoPermission> {
    return this.roletopermissionService.delete(id);
  }
}
