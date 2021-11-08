import { BadRequestException, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuctionService } from 'src/auction/auction.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { BID_CREATED_SUB } from './bid.types';
import { CreateBidInput } from './dto/create-bid.input';
import { QueryBidsDto } from './dto/query-bids.dto';

const pubSub = new PubSub();

@Injectable()
export class BidService {
  constructor(
    private readonly db: PrismaService,
    private readonly auctionService: AuctionService,
  ) {}

  async create(data: CreateBidInput) {
    const auction = await this.auctionService.findOne(data.auctionId);

    let highestPrice = (
      await this.db.bid.aggregate({
        where: {
          auctionId: data.auctionId,
        },
        _max: {
          price: true,
        },
      })
    )._max.price;

    if (!highestPrice) {
      highestPrice = auction.price;
    }

    if (data.price <= +highestPrice) {
      throw new BadRequestException(
        `Price must be higher than current price (${highestPrice})`,
      );
    }

    const bidCreated = await this.db.bid.create({
      data,
      include: {
        auction: true,
      },
    });

    pubSub.publish(BID_CREATED_SUB, { [BID_CREATED_SUB]: bidCreated });

    return bidCreated;
  }

  async findAll(queries: QueryBidsDto) {
    const {
      field = 'createdAt',
      direction = 'desc',
      cursor,
      auctionId,
    } = queries || {};

    const options = {
      skip: cursor ? 1 : 0,
      take: 5,
      cursor: cursor ? { id: cursor } : undefined,
    };

    const result = await this.db.bid.findMany({
      where: {
        auctionId,
      },
      ...options,
      orderBy: {
        [field]: direction,
      },
    });

    return {
      items: result,
      cursor: result.length > 0 ? result[result.length - 1].id : null,
    };
  }

  bidCreatedHandler(subName: string) {
    return pubSub.asyncIterator(subName);
  }
}
