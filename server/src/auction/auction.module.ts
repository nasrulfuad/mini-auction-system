import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionResolver } from './auction.resolver';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  providers: [PrismaService, AuctionResolver, AuctionService],
  exports: [AuctionService],
})
export class AuctionModule {}
