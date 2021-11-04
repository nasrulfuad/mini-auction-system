import { gql } from "@apollo/client";

export const auctionsQuery = gql`
  query Query {
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
      bids {
        id
        name
        price
        createdAt
      }
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
