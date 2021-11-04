import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { QueriesDonationsDto } from './dto/queries-donations.dto';

const pubSub = new PubSub();

@Injectable()
export class DonationsService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateDonationInput) {
    const result = await this.db.donation.create({
      data: dto,
    });

    const total = await this.getTotal();

    pubSub.publish('totalUpdated', { totalUpdated: { total } });

    return result;
  }

  async findAll(queries?: QueriesDonationsDto) {
    const { field = 'createdAt', direction = 'desc', cursor } = queries || {};

    const options = {
      skip: cursor ? 1 : 0,
      take: 5,
      cursor: cursor ? { id: cursor } : undefined,
    };

    const result = await this.db.donation.findMany({
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

  findOne(uniqueInput: Prisma.DonationWhereUniqueInput) {
    return this.db.donation.findUnique({
      where: uniqueInput,
    });
  }

  async getTotal() {
    const donations = await this.db.donation.aggregate({
      _sum: {
        count: true,
      },
    });

    return donations._sum.count;
  }

  subscribeTotalUpdated() {
    return pubSub.asyncIterator('totalUpdated');
  }
}
