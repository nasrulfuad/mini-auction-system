import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class QueryBidsDto {
  @Field(() => ID, { description: 'ID of an auction' })
  @IsNotEmpty()
  @IsUUID()
  auctionId: string;

  @Field(() => String, { description: 'Field', nullable: true })
  @IsOptional()
  @IsString()
  field: string;

  @Field(() => String, { description: 'Direction', nullable: true })
  @IsOptional()
  @IsString()
  direction: string;

  @Field(() => ID, { description: 'Cursor', nullable: true })
  @IsOptional()
  @IsUUID()
  cursor: string;
}
