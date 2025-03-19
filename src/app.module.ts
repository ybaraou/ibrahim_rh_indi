import { SalaireModule } from './salaire/salaire.module';
import { TransactionModule } from './transaction/transaction.module';
import { ModePaiementModule } from './modepaiement/modepaiement.module';
import { TypeEmployeModule } from './typeemploye/typeemploye.module';
import { HistoriqueSalaireModule } from './historiquesalaire/historiquesalaire.module';
import { PresenceModule } from './presence/presence.module';
import { DepartementModule } from './departement/departement.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { DocumentModule } from './document/document.module';
import { CongeModule } from './conge/conge.module';
import { PosteModule } from './poste/poste.module';
import { EmployeModule } from './employe/employe.module';
import { PermissionModule } from './permission/permission.module';
import { RoletoPermissionModule } from './roletopermission/roletopermission.module';
import { RoleModule } from './role/role.module';
import { GestionLogModule } from './gestionlog/gestionlog.module';
import { LoggingInterceptor } from './logger/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/all-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { configurationSchema } from './config/config.validation';

@Module({
  imports: [
    SalaireModule,
    TransactionModule,
    ModePaiementModule,
    TypeEmployeModule,
    HistoriqueSalaireModule,
    PresenceModule,
    DepartementModule,
    EvaluationModule,
    DocumentModule,
    CongeModule,
    PosteModule,
    EmployeModule,
    PermissionModule,
    RoletoPermissionModule,
    RoleModule,
    GestionLogModule,
    PrismaModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttle.ttl', 60),
          limit: configService.get<number>('throttle.limit', 10),
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configurationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
