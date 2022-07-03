import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  // controllers: [PrismaController],
  exports: [PrismaService],
})
export class PrismaModule {}
