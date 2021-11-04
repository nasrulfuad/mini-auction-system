import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateAuctionInput } from './dto/create-auction.input';
import { UpdateAuctionInput } from './dto/update-auction.input';

@Injectable()
export class AuctionService {
  constructor(private readonly db: PrismaService) {}
  create(dto: CreateAuctionInput) {
    return 'This action adds a new auction';
  }

  findAll() {
    return this.db.auction.findMany({});
  }

  async findOne(id: string) {
    const item = await this.db.auction.findUnique({
      where: { id },
      include: {
        bids: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!item) throw new NotFoundException('Auction not found');

    return item;
  }

  update(id: number, updateAuctionInput: UpdateAuctionInput) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
