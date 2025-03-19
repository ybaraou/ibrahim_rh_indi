import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Departement } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { DepartementEntityObj } from './data/departement.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class DepartementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDepartementDto): Promise<Departement> {
    const newData = await this.prisma.departement.create({
      data: {
        responsableId: dto.responsableId,
        name: dto.name,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DepartementWhereUniqueInput;
    where?: Prisma.DepartementWhereInput;
    orderBy?: Prisma.DepartementOrderByWithRelationInput;
  }): Promise<Pagination<Departement[]>> {
    if (params.where) {
      const validKeys = Object.keys(DepartementEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Departement',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(DepartementEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Departement'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.departement.count({
        where: { ...params.where },
      }),
      this.prisma.departement.findMany({
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

  async findOne(id: string): Promise<Departement | null> {
    return await this.prisma.departement.findUnique({
      where: { id },
      include: {
        employes: true,
        postes: true,
      },
    });
  }

  async update(id, dto: UpdateDepartementDto): Promise<Departement> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.departement.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Departement> {
    return await this.prisma.departement.delete({
      where: { id },
    });
  }
}
