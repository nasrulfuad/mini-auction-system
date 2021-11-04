import { Donation } from '.prisma/client';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { DonationQueryResult } from 'src/graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { QueriesDonationsDto } from './dto/queries-donations.dto';

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  create(
    @Args('createDonationInput') dto: CreateDonationInput,
  ): Promise<Donation> {
    return this.donationsService.create(dto);
  }

  @Query('donations')
  findAll(
    @Args('queries')
    queries: QueriesDonationsDto,
  ): Promise<DonationQueryResult> {
    return this.donationsService.findAll(queries);
  }

  @Query('donation')
  findOne(@Args('id') id: string): Promise<Donation> {
    return this.donationsService.findOne({
      id,
    });
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal();
  }

  @Subscription()
  totalUpdated() {
    return this.donationsService.subscribeTotalUpdated();
  }
}
