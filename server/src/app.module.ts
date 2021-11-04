import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: {
        subscriptionEndpoint: '/subscriptions',
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      resolvers: { DateTime: GraphQLDateTime },
      sortSchema: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/subscriptions',
        },
      },
    }),
    AuctionModule,
    BidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
