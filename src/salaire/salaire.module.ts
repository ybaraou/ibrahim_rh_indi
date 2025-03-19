import { Module } from '@nestjs/common';
import { SalaireService } from './salaire.service';
import { SalaireController } from './salaire.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SalaireController],
  providers: [SalaireService],
})
export class SalaireModule {}
