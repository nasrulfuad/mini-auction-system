import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Bid } from './entities/bid.entity';

export const BID_CREATED_SUB = 'BID_CREATED';

@ObjectType()
export class Bids {
  @Field(() => [Bid], { description: 'List of bids' })
  items: Bid[];

  @Field(() => ID, { description: 'Cursor id', nullable: true })
  cursor: string;
}
