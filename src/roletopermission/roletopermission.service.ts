import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateRoletoPermissionDto } from './dto/create-roletopermission.dto';
import { UpdateRoletoPermissionDto } from './dto/update-roletopermission.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, RoletoPermission } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { RoletoPermissionEntityObj } from './data/roletopermission.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class RoletoPermissionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoletoPermissionDto): Promise<RoletoPermission> {
    const newData = await this.prisma.roletoPermission.create({
      data: {
        roleId: dto.roleId,
        permissionId: dto.permissionId,
        codePermission: dto.codePermission,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoletoPermissionWhereUniqueInput;
    where?: Prisma.RoletoPermissionWhereInput;
    orderBy?: Prisma.RoletoPermissionOrderByWithRelationInput;
  }): Promise<Pagination<RoletoPermission[]>> {
    if (params.where) {
      const validKeys = Object.keys(RoletoPermissionEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'RoletoPermission',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (
              !Object.keys(RoletoPermissionEntityObj[key]).includes(nestedKey)
            )
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'RoletoPermission'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.roletoPermission.count({
        where: { ...params.where },
      }),
      this.prisma.roletoPermission.findMany({
        skip: params.skip,
        take: params.take,
        cursor: params.cursor,
        where: {
          ...params.where,
        },
        orderBy: params.orderBy,
      }),
    ]);

    return {
      totals,
      take: params.take,
      skip: params.skip,
      items,
    };
  }

  async findOne(id: string): Promise<RoletoPermission | null> {
    return await this.prisma.roletoPermission.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateRoletoPermissionDto): Promise<RoletoPermission> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.roletoPermission.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<RoletoPermission> {
    return await this.prisma.roletoPermission.delete({
      where: { id },
    });
  }
}
