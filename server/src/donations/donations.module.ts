import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  providers: [PrismaService, DonationsResolver, DonationsService],
})
export class DonationsModule {}
