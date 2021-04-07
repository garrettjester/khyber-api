const { gql } = require("apollo-server-express")

module.exports = gql` 

type DealStep {
  id: ID!
  type: String!
  status: DealStepStatus
  startTime: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum DealStepStatus {
  complete
  in_progress
  failed
  waiting
}

input UpdateDealStep {
  status: DealStepStatus
}

type Mutation {
  updateDealStep(id: ID!): DealStep!
}


`;