import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AuctionService } from './auction.service';
import { Auction } from './entities/auction.entity';
import { CreateAuctionInput } from './dto/create-auction.input';
import { UpdateAuctionInput } from './dto/update-auction.input';

@Resolver(() => Auction)
export class AuctionResolver {
  constructor(private readonly service: AuctionService) {}

  @Mutation(() => Auction)
  createAuction(
    @Args('createAuctionInput') createAuctionInput: CreateAuctionInput,
  ) {
    return this.service.create(createAuctionInput);
  }

  @Query(() => [Auction], { name: 'auctions' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Auction, { name: 'auction' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Auction)
  updateAuction(
    @Args('updateAuctionInput') updateAuctionInput: UpdateAuctionInput,
  ) {
    return this.service.update(updateAuctionInput.id, updateAuctionInput);
  }

  @Mutation(() => Auction)
  removeAuction(@Args('id', { type: () => Int }) id: number) {
    return this.service.remove(id);
  }
}
