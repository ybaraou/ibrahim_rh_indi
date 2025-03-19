import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSalaireDto } from './dto/create-salaire.dto';
import { UpdateSalaireDto } from './dto/update-salaire.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Salaire } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { SalaireEntityObj } from './data/salaire.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class SalaireService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSalaireDto): Promise<Salaire> {
    const newData = await this.prisma.salaire.create({
      data: {
        employeId: dto.employeId,
        salaireBrut: dto.salaireBrut,
        deductions: dto.deductions,
        salaireNet: dto.salaireNet,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SalaireWhereUniqueInput;
    where?: Prisma.SalaireWhereInput;
    orderBy?: Prisma.SalaireOrderByWithRelationInput;
  }): Promise<Pagination<Salaire[]>> {
    if (params.where) {
      const validKeys = Object.keys(SalaireEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Salaire',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(SalaireEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Salaire'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.salaire.count({
        where: { ...params.where },
      }),
      this.prisma.salaire.findMany({
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

  async findOne(id: string): Promise<Salaire | null> {
    return await this.prisma.salaire.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateSalaireDto): Promise<Salaire> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.salaire.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Salaire> {
    return await this.prisma.salaire.delete({
      where: { id },
    });
  }
}
