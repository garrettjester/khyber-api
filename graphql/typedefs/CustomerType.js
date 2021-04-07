const { gql } = require("apollo-server-express");

module.exports = gql`

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    deals: [Deal]
    notes: [Note]
    address: Address
    appointments: [Appointment]
    createdAt: DateTime!
    updatedAt: DateTime!
  }


  enum Manufacturer {
    audi
    bmw
    acura
  }

  input CreateCustomerInput {
    firstName: String!
    lastName: String!
    address: CreateAddressInput
    phoneNumber: String
    email: String
    notes: String
    insuranceUrl: String
  }

  input UpdateCustomerInput {
    firstName: String
    lastName: String
    address: CreateAddressInput
    insuranceUrl: String
    notes: String
  }


  input CreateAddressInput {
    street: String!
    state: String!
    city: String!
    postalCode: String!
  }


  type Mutation {
    createCustomer(input: CreateCustomerInput!): Customer! @auth(requires: USER)
    updateCustomer(input: UpdateCustomerInput): Customer! @auth(requires: USER)
    deleteCustomer(id: ID!): SuccessMessage! @auth(requires: USER)
  }

  type Query {
    getCustomer(id: ID!): Customer! @auth(requires: USER)
  }

`;