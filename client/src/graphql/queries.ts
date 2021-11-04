import { gql } from "@apollo/client";

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
