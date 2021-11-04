import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Bid } from 'src/bid/entities/bid.entity';

@ObjectType({ description: 'auction' })
export class Auction {
  @Field(() => ID, { description: 'ID of an auction' })
  id: string;

  @Field(() => String, { description: 'Name of an auction' })
  name: string;

  @Field(() => Int, { description: 'Current price of an auction' })
  price: number;

  @Field(() => Int, { description: 'Price buy it now' })
  priceBIN: number;

  @Field(() => Date, { description: 'Auction start of an auction' })
  auctionStart: Date;

  @Field(() => Date, { description: 'Auction end of an auction' })
  auctionEnd: Date;

  @Field(() => [Bid], { description: 'List of bids', nullable: true })
  bids: Bid[];
}
