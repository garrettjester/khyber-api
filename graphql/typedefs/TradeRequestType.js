const { gql } = require("apollo-server-express");

module.exports = gql`

  type TradeRequest {
    id: ID!
    status: TradeRequestStatus!
    requester: User!
    requestedVehicle: Vehicle!
    requestedFrom: Dealer!
    returnVehicle: Vehicle
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TradeRequestStatus {
    pending
    complete
    denied
  }

  input CreateTradeRequest {
    name: String!
    manufacturer: Manufacturer!
  }

  input UpdateTradeRequest {
    name: String
    status: TradeRequestStatus
    description: String
    coverImage: String
  }
`;
