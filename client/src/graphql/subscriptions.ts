import { gql } from "@apollo/client";

export const bidCreatedSubscription = gql`
  subscription bidCreated {
    BID_CREATED {
      id
      name
      price
      createdAt
    }
  }
`;
