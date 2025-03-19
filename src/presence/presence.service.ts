import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePresenceDto } from './dto/create-presence.dto';
import { UpdatePresenceDto } from './dto/update-presence.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Presence } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { PresenceEntityObj } from './data/presence.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class PresenceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePresenceDto): Promise<Presence> {
    const newData = await this.prisma.presence.create({
      data: {
        employeId: dto.employeId,
        date: dto.date,
        heureArrivee: dto.heureArrivee,
        heureDepart: dto.heureDepart,
        status: dto.status,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PresenceWhereUniqueInput;
    where?: Prisma.PresenceWhereInput;
    orderBy?: Prisma.PresenceOrderByWithRelationInput;
  }): Promise<Pagination<Presence[]>> {
    if (params.where) {
      const validKeys = Object.keys(PresenceEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Presence',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(PresenceEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Presence'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.presence.count({
        where: { ...params.where },
      }),
      this.prisma.presence.findMany({
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

  async findOne(id: string): Promise<Presence | null> {
    return await this.prisma.presence.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdatePresenceDto): Promise<Presence> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.presence.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Presence> {
    return await this.prisma.presence.delete({
      where: { id },
    });
  }
}
