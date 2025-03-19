import { Module } from '@nestjs/common';
import { HistoriqueSalaireService } from './historiquesalaire.service';
import { HistoriqueSalaireController } from './historiquesalaire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HistoriqueSalaireController],
  providers: [HistoriqueSalaireService],
})
export class HistoriqueSalaireModule {}
