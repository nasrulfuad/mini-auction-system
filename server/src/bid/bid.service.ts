import { BadRequestException, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { AuctionService } from 'src/auction/auction.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { BID_CREATED_SUB } from './bid.types';
import { CreateBidInput } from './dto/create-bid.input';
import { UpdateBidInput } from './dto/update-bid.input';

const pubSub = new PubSub();

@Injectable()
export class BidService {
  constructor(
    private readonly db: PrismaService,
    private readonly auctionService: AuctionService,
  ) {}

  async create(data: CreateBidInput) {
    await this.auctionService.findOne(data.auctionId);

    const highestPrice = (
      await this.db.bid.aggregate({
        where: {
          auctionId: data.auctionId,
        },
        _max: {
          price: true,
        },
      })
    )._max.price;

    if (highestPrice) {
      if (data.price <= +highestPrice) {
        throw new BadRequestException(
          'Price must be higher than latest bid price',
        );
      }
    }

    const bidCreated = await this.db.bid.create({
      data,
      include: {
        auction: true,
      },
    });

    pubSub.publish(BID_CREATED_SUB, { bidCreated });

    return bidCreated;
  }

  findAll(auctionId: string) {
    return this.db.bid.findMany({
      where: {
        auctionId,
      },
    });
  }

  findOne(id: string) {
    return id;
  }

  update(id: number, updateBidInput: UpdateBidInput) {
    return `This action updates a #${id} bid`;
  }

  remove(id: number) {
    return `This action removes a #${id} bid`;
  }

  bidCreatedHandler(subName: string) {
    return pubSub.asyncIterator(subName);
  }
}
