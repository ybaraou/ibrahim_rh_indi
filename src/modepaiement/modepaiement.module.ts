import { Module } from '@nestjs/common';
import { ModePaiementService } from './modepaiement.service';
import { ModePaiementController } from './modepaiement.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ModePaiementController],
  providers: [ModePaiementService],
})
export class ModePaiementModule {}
