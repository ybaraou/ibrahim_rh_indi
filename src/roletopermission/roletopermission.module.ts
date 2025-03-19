import { Module } from '@nestjs/common';
import { RoletoPermissionService } from './roletopermission.service';
import { RoletoPermissionController } from './roletopermission.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoletoPermissionController],
  providers: [RoletoPermissionService],
})
export class RoletoPermissionModule {}
