import {
  Injectable,
  NotFoundException,
  Post,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Employe } from '@prisma/client';
import { Pagination } from '../types/pagination';
import { EmployeEntityObj } from './data/employe.data';
import {
  CONFLICT_IN_COMMON_INSERT,
  INVALID_FIELD_IN_COMMON_ENTITY,
  NOT_FOUND_VALUE_IN_COMMON_DATA_ENTITY,
} from '../errors';

@Injectable()
export class EmployeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEmployeDto): Promise<Employe> {
    const newData = await this.prisma.employe.create({
      data: {
        nom: dto.nom,
        prenom: dto.prenom,
        email: dto.email,
        telephone: dto.telephone,
        date_naissance: dto.date_naissance,
        posteId: dto.posteId,
        roleId: dto.roleId,
        typeEmployeId: dto.typeEmployeId,
        salaire: dto.salaire,
        dateEmbauche: dto.dateEmbauche,
        departementId: dto.departementId,
        status: dto.status,
        password: dto.password,
        token: dto.token,
      },
    });
    return newData;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeWhereUniqueInput;
    where?: Prisma.EmployeWhereInput;
    orderBy?: Prisma.EmployeOrderByWithRelationInput;
  }): Promise<Pagination<Employe[]>> {
    if (params.where) {
      const validKeys = Object.keys(EmployeEntityObj);
      Object.keys(params.where)?.forEach((key) => {
        if (!validKeys.includes(key))
          throw new BadRequestException(
            INVALID_FIELD_IN_COMMON_ENTITY.replace('$key', key).replace(
              '$entity',
              'Employe',
            ),
          );
        Object.keys(params.where![key])?.forEach((nestedKey) => {
          const nestedToValidate = params.where![key][nestedKey] as
            | Record<string, string>
            | string;
          if (typeof nestedToValidate == 'object') {
            if (!Object.keys(EmployeEntityObj[key]).includes(nestedKey))
              throw new BadRequestException(
                INVALID_FIELD_IN_COMMON_ENTITY.replace(
                  '$key',
                  `${key}.${nestedKey}`,
                ).replace('$entity', 'Employe'),
              );
          }
        });
      });
    }

    const [totals, items] = await this.prisma.$transaction([
      this.prisma.employe.count({
        where: { ...params.where },
      }),
      this.prisma.employe.findMany({
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

  async findOne(id: string): Promise<Employe | null> {
    return await this.prisma.employe.findUnique({
      where: { id },
      include: {
        conges: true,
        historiquesalaire: true,
        evaluations: true,
        presences: true,
        gestionlogs: true,
        documents: true,
        transactionsEffectuer: true,
        salaires: true,
        responsableInDepartement: true,
        transactionsRecu: true,
      },
    });
  }

  async update(id, dto: UpdateEmployeDto): Promise<Employe> {
    const data = await this.findOne(id);
    if (!data) throw new NotFoundException("L'identifiant id n'existe pas");
    return await this.prisma.employe.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string): Promise<Employe> {
    return await this.prisma.employe.delete({
      where: { id },
    });
  }
}
