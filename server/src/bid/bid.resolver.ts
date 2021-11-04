import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { BidService } from './bid.service';
import { Bid } from './entities/bid.entity';
import { CreateBidInput } from './dto/create-bid.input';
import { UpdateBidInput } from './dto/update-bid.input';
import { BID_CREATED_SUB } from './bid.types';

@Resolver(() => Bid)
export class BidResolver {
  constructor(private readonly bidService: BidService) {}

  @Mutation(() => Bid)
  createBid(@Args('createBidInput') dto: CreateBidInput) {
    return this.bidService.create(dto);
  }

  @Query(() => [Bid], { name: 'bid' })
  findAll(@Args('auctionId', { type: () => ID }) auctionId: string) {
    return this.bidService.findAll(auctionId);
  }

  @Query(() => Bid, { name: 'bid' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.bidService.findOne(id);
  }

  @Mutation(() => Bid)
  updateBid(@Args('updateBidInput') updateBidInput: UpdateBidInput) {
    return this.bidService.update(updateBidInput.id, updateBidInput);
  }

  @Mutation(() => Bid)
  removeBid(@Args('id', { type: () => Int }) id: number) {
    return this.bidService.remove(id);
  }

  @Subscription(() => Bid, {
    name: BID_CREATED_SUB,
  })
  bidCreatedHandler() {
    return this.bidService.bidCreatedHandler(BID_CREATED_SUB);
  }
}
