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
import { Prisma, Role } from '@prisma/client';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Request } from 'express';
import { OptionalIntPipe } from '../pipes/optional-int.pipe';
import { CursorPipe } from '../pipes/cursor.pipe';
import { WherePipe } from '../pipes/where.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { Pagination } from '../types/pagination';
import { RoleExample, RoleEntity } from './data/role.data';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiResponse({
    status: 201,
    description: 'role successfully created',
    type: RoleEntity,
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
    type: CreateRoleDto,
    examples: {
      exemple1: {
        summary: 'Example of Role fields',
        value: RoleExample,
        description: 'Role fields',
      },
    },
  })
  @ApiOperation({
    operationId: 'CreateRole',
    summary: 'Create a new role record',
    description: 'Adds a new role to the system with the provided data.',
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
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Role retrieved successfully.',
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
    operationId: 'GetAllRole',
    summary: 'Retrieve multiple Role',
    description:
      'Fetch a list of Role with optional filtering, pagination, and sorting.',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of Role to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of Role to return',
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
    @Query('cursor', CursorPipe) cursor?: Prisma.RoleWhereUniqueInput,
    @Query('where', WherePipe) where?: Record<string, number | string>,
    @Query('orderBy', OrderByPipe) orderBy?: Record<string, 'asc' | 'desc'>,
  ): Promise<Pagination<Role[]>> {
    return this.roleService.findAll({ cursor, orderBy, skip, take, where });
  }

  @ApiResponse({
    status: 200,
    description: 'Role retrieved successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request - Invalid Role ID.' })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Role not found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'GetOneRole',
    summary: 'Retrieve a single Role',
    description: 'Fetch details of a single Role by their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of Role',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role | null> {
    return this.roleService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Role successfully modified',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: - The request contains invalid data fields.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Role found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiBody({ type: UpdateRoleDto })
  @ApiOperation({
    operationId: 'UpdateRole',
    summary: 'Update an existing Role record',
    description:
      'Update an existing Role to the system with the provided data.',
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
    description: 'The unique identifier of Role',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto): Promise<Role> {
    return this.roleService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid Role ID format.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - No Role found with the given ID.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error - Something went wrong on the server.',
  })
  @ApiOperation({
    operationId: 'DeleteRole',
    summary: 'Delete a role',
    description: 'Remove a role from the database using their unique ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the role to delete',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<Role> {
    return this.roleService.delete(id);
  }
}
