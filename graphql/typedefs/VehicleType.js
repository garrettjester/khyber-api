const { gql } = require("apollo-server-express");

module.exports = gql`

  type Vehicle {
    vin: ID!
    status: String!
    manufacturer: String!
    used: Boolean!
    commissionNumber: String
    modelCode: String
    options: String
    cpo: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
  }


  input CreateVehicleInput {
    vin: ID!
    manufacturer: String!
    modelCode: String!
    msrp: Int!
    mileage: Int!
    price: Int!
    used: Boolean
    commissionNumber: String
    options: String
    cpo: Boolean
    status: String
  }


  input UpdateVehicleInput {
    used: Boolean
    options: String
    cpo: Boolean
    status: String
  }


  enum TradeRequestStatus {
    pending
    complete
    denied
  }

  type SuccessMessage {
    success: Boolean
    message: String
  }

  type Mutation {
    createVehicle(input: CreateVehicleInput!): Vehicle!
    updateVehicle(input: UpdateVehicleInput!): Vehicle!
    deleteVehicle(vin: ID!): SuccessMessage!
  }

  type Query {
    getVehicle(vin: ID): String!
  }
  
`;
