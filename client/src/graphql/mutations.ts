import gql from "graphql-tag";

export const createBidMutation = gql`
  mutation createBid($createBidInput: CreateBidInput!) {
    createBid(createBidInput: $createBidInput) {
      id
      name
      price
      createdAt
    }
  }
`;
