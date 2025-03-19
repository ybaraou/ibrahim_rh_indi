import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePosteDto } from './dto/create-poste.dto';
import { UpdatePosteDto } from './dto/update-poste.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Poste } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { PosteEntityObj } from './data/poste.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class PosteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePosteDto): Promise<Poste> {
    const newData = await this.prisma.poste.create({
      data: {
        nom: dto.nom,
        departementId: dto.departementId,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PosteWhereUniqueInput;
    where?: Prisma.PosteWhereInput;
    orderBy?: Prisma.PosteOrderByWithRelationInput;
  }): Promise<Pagination<Poste[]>> {
    if (params.where) {
      const validKeys = Object.keys(PosteEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Poste',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(PosteEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Poste'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.poste.count({
        where: { ...params.where },
      }),
      this.prisma.poste.findMany({
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

  async findOne(id: string): Promise<Poste | null> {
    return await this.prisma.poste.findUnique({
      where: { id },
      include: {
        employes: true,
      },
    });
  }

  async update(id, dto: UpdatePosteDto): Promise<Poste> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.poste.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Poste> {
    return await this.prisma.poste.delete({
      where: { id },
    });
  }
}
