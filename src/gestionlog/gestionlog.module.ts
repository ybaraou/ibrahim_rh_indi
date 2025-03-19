import { Module } from '@nestjs/common';
import { GestionLogService } from './gestionlog.service';
import { GestionLogController } from './gestionlog.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GestionLogController],
  providers: [GestionLogService],
})
export class GestionLogModule {}
