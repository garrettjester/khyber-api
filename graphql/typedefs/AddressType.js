
const { gql } = require("apollo-server-express");

module.exports = gql`

  type Address {
    id: ID!
    street: String!
    city: String!
    state: String!
    country: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateAddressInput {
    street: String!
    city: String!
    state: String!
    country: String!
  }

  input UpdateAddressInput {
    street: String
    city: String
    state: String
    country: String
  }

  type Mutation {
    createAddress(input: CreateAddressInput): Address!
    updateAddress(input: UpdateAddressInput): Address!
  }
  
`;