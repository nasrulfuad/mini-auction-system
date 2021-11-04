export const createDonation = `
  mutation Mutation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      id
      count
      displayName
      createdAt
      message
      email
      mobile
      team
    }
  }
`;
