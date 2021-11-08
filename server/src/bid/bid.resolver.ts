import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { BidService } from './bid.service';
import { BID_CREATED_SUB, Bids } from './bid.types';
import { CreateBidInput } from './dto/create-bid.input';
import { QueryBidsDto } from './dto/query-bids.dto';
import { Bid } from './entities/bid.entity';

@Resolver(() => Bid)
export class BidResolver {
  constructor(private readonly bidService: BidService) {}

  @Mutation(() => Bid)
  createBid(@Args('createBidInput') dto: CreateBidInput) {
    return this.bidService.create(dto);
  }

  @Query(() => Bids, { name: 'bids' })
  findAll(
    @Args('queryBidsDto', { type: () => QueryBidsDto }) queries: QueryBidsDto,
  ) {
    return this.bidService.findAll(queries);
  }

  @Subscription(() => Bid, {
    name: BID_CREATED_SUB,
  })
  bidCreatedHandler() {
    return this.bidService.bidCreatedHandler(BID_CREATED_SUB);
  }
}
