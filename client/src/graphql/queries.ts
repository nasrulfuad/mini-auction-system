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
  query bids($queries: QueryBidsDto!) {
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
