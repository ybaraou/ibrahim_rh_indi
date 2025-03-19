import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Evaluation } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { EvaluationEntityObj } from './data/evaluation.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class EvaluationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEvaluationDto): Promise<Evaluation> {
    const newData = await this.prisma.evaluation.create({
      data: {
        employeId: dto.employeId,
        date: dto.date,
        commentaire: dto.commentaire,
        deductions: dto.deductions,
        note: dto.note,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EvaluationWhereUniqueInput;
    where?: Prisma.EvaluationWhereInput;
    orderBy?: Prisma.EvaluationOrderByWithRelationInput;
  }): Promise<Pagination<Evaluation[]>> {
    if (params.where) {
      const validKeys = Object.keys(EvaluationEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Evaluation',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(EvaluationEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Evaluation'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.evaluation.count({
        where: { ...params.where },
      }),
      this.prisma.evaluation.findMany({
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

  async findOne(id: string): Promise<Evaluation | null> {
    return await this.prisma.evaluation.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateEvaluationDto): Promise<Evaluation> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.evaluation.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Evaluation> {
    return await this.prisma.evaluation.delete({
      where: { id },
    });
  }
}
