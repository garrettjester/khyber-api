const { gql } = require("apollo-server-express");

module.exports = gql`

  type Dealer {
    id: ID!
    name: String!
    manufacturer: Manufacturer!
    dealerCode: String
    employees: [User]
    customers: [Customer]
    trades: [TradeRequest]
    vehicles: [Vehicle]
    deals: [Deal]
    appointments: [Appointment]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Manufacturer {
    audi
    bmw
    acura
  }

  input DealerInput {
    name: String!
    manufacturer: Manufacturer!
    dealerCode: String
  }

  input RootUserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    password: String!
  }

  input CreateDealerInput {
    dealer: DealerInput!
    address: CreateAddressInput!
    user: RootUserInput!
  }

  input UpdateDealerInput {
    name: String
    logo: String
    addressId: String
  }


  type Mutation {
    verifyRootEmail(email: String!): SuccessMessage!
    confirmRootEmail(email: String!, code: String!): SuccessMessage!
    createDealer(input: CreateDealerInput): AuthPayload!
    deleteDealer(id: ID!): SuccessMessage! @auth(requires: ROOT)
    updateDealer(input: UpdateDealerInput): Dealer! @auth(requires: ADMIN)
  }

  type Query {
    getDealer(id: ID!): Dealer! @auth(requires: USER)
  }
`;
