const { gql } = require("apollo-server-express")

module.exports = gql` 

type Deal {
  id: ID!
  status: String!
  customer: Customer
  vehicle: Vehicle
  owner: User!
  notes: String
  dealsteps: [DealStep]
  createdAt: DateTime!
  updatedAt: DateTime!
}

input CreateDealInput {
  customerId: ID!
  vehicleId: ID!
  userId: ID!
  dealerId: ID!
  hasTrade: Boolean!
  needsFinancing: Boolean!
  notes: String
}


input UpdateDealInput {
  firstName: String
  lastName: String
  phoneNumber: String
  email: String
}


type Mutation {
  createDeal(input: CreateDealInput!): Deal!
  deleteDeal(id: ID!): SuccessMessage!
  updateDeal(id: ID!): Deal!
}

type Query {
  getDeal(id: ID!): Deal!
}


`;