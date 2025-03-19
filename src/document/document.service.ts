import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Document } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { DocumentEntityObj } from './data/document.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentDto): Promise<Document> {
    const newData = await this.prisma.document.create({
      data: {
        employeId: dto.employeId,
        nom: dto.nom,
        urlFichier: dto.urlFichier,
        status: dto.status,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DocumentWhereUniqueInput;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput;
  }): Promise<Pagination<Document[]>> {
    if (params.where) {
      const validKeys = Object.keys(DocumentEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Document',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(DocumentEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Document'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.document.count({
        where: { ...params.where },
      }),
      this.prisma.document.findMany({
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

  async findOne(id: string): Promise<Document | null> {
    return await this.prisma.document.findUnique({
      where: { id },
    });
  }

  async update(id, dto: UpdateDocumentDto): Promise<Document> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.document.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Document> {
    return await this.prisma.document.delete({
      where: { id },
    });
  }
}
