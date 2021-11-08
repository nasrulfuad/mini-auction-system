import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateBidInput {
  @Field(() => ID, { description: 'Auction id' })
  @IsNotEmpty()
  @IsUUID()
  auctionId: string;

  @Field(() => String, { description: 'Name of a bidder' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Int, { description: 'Price of bidder offer' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
