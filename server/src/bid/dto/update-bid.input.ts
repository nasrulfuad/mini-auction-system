import { CreateBidInput } from './create-bid.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBidInput extends PartialType(CreateBidInput) {
  @Field(() => Int)
  id: number;
}
