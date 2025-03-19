import { Module } from '@nestjs/common';
import { CongeService } from './conge.service';
import { CongeController } from './conge.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CongeController],
  providers: [CongeService],
})
export class CongeModule {}
