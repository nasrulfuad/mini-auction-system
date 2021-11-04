import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Bid {
  @Field(() => ID, { description: 'ID of an bid' })
  id: string;

  @Field(() => String, { description: 'Name of a bidder' })
  name: string;

  @Field(() => Int, { description: 'Price of bidder offer' })
  price: number;

  @Field(() => Date, { description: 'Bid created' })
  createdAt: Date;
}
