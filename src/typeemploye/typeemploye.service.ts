import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTypeEmployeDto } from './dto/create-typeemploye.dto';
import { UpdateTypeEmployeDto } from './dto/update-typeemploye.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, TypeEmploye } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { TypeEmployeEntityObj } from './data/typeemploye.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class TypeEmployeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTypeEmployeDto): Promise<TypeEmploye> {
    const newData = await this.prisma.typeEmploye.create({
      data: {
        nom: dto.nom,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TypeEmployeWhereUniqueInput;
    where?: Prisma.TypeEmployeWhereInput;
    orderBy?: Prisma.TypeEmployeOrderByWithRelationInput;
  }): Promise<Pagination<TypeEmploye[]>> {
    if (params.where) {
      const validKeys = Object.keys(TypeEmployeEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'TypeEmploye',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(TypeEmployeEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'TypeEmploye'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.typeEmploye.count({
        where: { ...params.where },
      }),
      this.prisma.typeEmploye.findMany({
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

  async findOne(id: string): Promise<TypeEmploye | null> {
    return await this.prisma.typeEmploye.findUnique({
      where: { id },
      include: {
        employes: true,
      },
    });
  }

  async update(id, dto: UpdateTypeEmployeDto): Promise<TypeEmploye> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.typeEmploye.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<TypeEmploye> {
    return await this.prisma.typeEmploye.delete({
      where: { id },
    });
  }
}
