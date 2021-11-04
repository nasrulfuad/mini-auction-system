import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidResolver } from './bid.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { AuctionModule } from 'src/auction/auction.module';

@Module({
  imports: [AuctionModule],
  providers: [PrismaService, BidResolver, BidService],
})
export class BidModule {}
