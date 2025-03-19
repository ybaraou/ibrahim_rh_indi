import { Module } from '@nestjs/common';
import { TypeEmployeService } from './typeemploye.service';
import { TypeEmployeController } from './typeemploye.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TypeEmployeController],
  providers: [TypeEmployeService],
})
export class TypeEmployeModule {}
