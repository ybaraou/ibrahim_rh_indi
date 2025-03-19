import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateModePaiementDto } from './dto/create-modepaiement.dto';
import { UpdateModePaiementDto } from './dto/update-modepaiement.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, ModePaiement } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { ModePaiementEntityObj } from './data/modepaiement.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class ModePaiementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModePaiementDto): Promise<ModePaiement> {
    const newData = await this.prisma.modePaiement.create({
      data: {
        code: dto.code,
        name: dto.name,
        status: dto.status,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ModePaiementWhereUniqueInput;
    where?: Prisma.ModePaiementWhereInput;
    orderBy?: Prisma.ModePaiementOrderByWithRelationInput;
  }): Promise<Pagination<ModePaiement[]>> {
    if (params.where) {
      const validKeys = Object.keys(ModePaiementEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'ModePaiement',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(ModePaiementEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'ModePaiement'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.modePaiement.count({
        where: { ...params.where },
      }),
      this.prisma.modePaiement.findMany({
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

  async findOne(id: string): Promise<ModePaiement | null> {
    return await this.prisma.modePaiement.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });
  }

  async update(id, dto: UpdateModePaiementDto): Promise<ModePaiement> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.modePaiement.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<ModePaiement> {
    return await this.prisma.modePaiement.delete({
      where: { id },
    });
  }
}
