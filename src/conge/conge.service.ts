import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCongeDto } from './dto/create-conge.dto';
import { UpdateCongeDto } from './dto/update-conge.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Conge } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { CongeEntityObj } from './data/conge.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class CongeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCongeDto): Promise<Conge> {
    const newData = await this.prisma.conge.create({
      data: {
        employeId: dto.employeId,
        dateDebut: dto.dateDebut,
        dateFin: dto.dateFin,
        status: dto.status,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CongeWhereUniqueInput;
    where?: Prisma.CongeWhereInput;
    orderBy?: Prisma.CongeOrderByWithRelationInput;
  }): Promise<Pagination<Conge[]>> {
    if (params.where) {
      const validKeys = Object.keys(CongeEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Conge',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(CongeEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Conge'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.conge.count({
        where: { ...params.where },
      }),
      this.prisma.conge.findMany({
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

  async findOne(id: string): Promise<Conge | null> {
    return await this.prisma.conge.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateCongeDto): Promise<Conge> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.conge.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Conge> {
    return await this.prisma.conge.delete({
      where: { id },
    });
  }
}
