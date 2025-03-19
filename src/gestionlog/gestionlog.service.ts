import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateGestionLogDto } from './dto/create-gestionlog.dto';
import { UpdateGestionLogDto } from './dto/update-gestionlog.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, GestionLog } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { GestionLogEntityObj } from './data/gestionlog.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class GestionLogService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGestionLogDto): Promise<GestionLog> {
    const newData = await this.prisma.gestionLog.create({
      data: {
        labelle: dto.labelle,
        action: dto.action,
        employeId: dto.employeId,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GestionLogWhereUniqueInput;
    where?: Prisma.GestionLogWhereInput;
    orderBy?: Prisma.GestionLogOrderByWithRelationInput;
  }): Promise<Pagination<GestionLog[]>> {
    if (params.where) {
      const validKeys = Object.keys(GestionLogEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'GestionLog',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(GestionLogEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'GestionLog'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.gestionLog.count({
        where: { ...params.where },
      }),
      this.prisma.gestionLog.findMany({
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

  async findOne(id: string): Promise<GestionLog | null> {
    return await this.prisma.gestionLog.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateGestionLogDto): Promise<GestionLog> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.gestionLog.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<GestionLog> {
    return await this.prisma.gestionLog.delete({
      where: { id },
    });
  }
}
