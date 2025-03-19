import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateHistoriqueSalaireDto } from './dto/create-historiquesalaire.dto';
import { UpdateHistoriqueSalaireDto } from './dto/update-historiquesalaire.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, HistoriqueSalaire } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { HistoriqueSalaireEntityObj } from './data/historiquesalaire.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class HistoriqueSalaireService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateHistoriqueSalaireDto): Promise<HistoriqueSalaire> {
    const newData = await this.prisma.historiqueSalaire.create({
      data: {
        employeId: dto.employeId,
        date: dto.date,
        montant: dto.montant,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.HistoriqueSalaireWhereUniqueInput;
    where?: Prisma.HistoriqueSalaireWhereInput;
    orderBy?: Prisma.HistoriqueSalaireOrderByWithRelationInput;
  }): Promise<Pagination<HistoriqueSalaire[]>> {
    if (params.where) {
      const validKeys = Object.keys(HistoriqueSalaireEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'HistoriqueSalaire',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (
              !Object.keys(HistoriqueSalaireEntityObj[key]).includes(nestedKey)
            )
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'HistoriqueSalaire'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.historiqueSalaire.count({
        where: { ...params.where },
      }),
      this.prisma.historiqueSalaire.findMany({
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

  async findOne(id: string): Promise<HistoriqueSalaire | null> {
    return await this.prisma.historiqueSalaire.findUnique({
      where: { id },
    });
  }

  async update(
    id,
    dto: UpdateHistoriqueSalaireDto,
  ): Promise<HistoriqueSalaire> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.historiqueSalaire.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<HistoriqueSalaire> {
    return await this.prisma.historiqueSalaire.delete({
      where: { id },
    });
  }
}
