import { gql } from "@apollo/client";

export const totalUpdatedSubscription = gql`
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;
