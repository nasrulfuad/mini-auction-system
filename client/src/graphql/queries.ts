import { gql } from "@apollo/client";

export const auctionsQuery = gql`
  query Auctions {
    auctions {
      id
      name
      price
      priceBIN
      auctionStart
      auctionEnd
    }
  }
`;

export const auctionQuery = gql`
  query Auction($id: ID!) {
    auction(id: $id) {
      id
      name
      price
      priceBIN
      auctionStart
      auctionEnd
    }
  }
`;

export const bidsQuery = gql`
  query Query($queries: QueryBidsDto!) {
    bids(queryBidsDto: $queries) {
      items {
        id
        name
        price
        createdAt
      }
      cursor
    }
  }
`;

export const totalDonationQuery = gql`
  query Query {
    totalDonations
  }
`;

export const donationsQUery = gql`
  query Query($queries: DonationQueries) {
    donations(queries: $queries) {
      items {
        id
        count
        displayName
        team
        mobile
        email
        createdAt
        message
      }
      cursor
    }
  }
`;
