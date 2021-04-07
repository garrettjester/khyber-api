
const { gql } = require("apollo-server-express");

module.exports = gql`

  type Note {
    id: ID!
    author: User
    message: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TradeRequestStatus {
    pending
    complete
    denied
  }

  type Mutation {
    createNote(authorId: ID!, message: String!): Note!
    updateNote(id: ID!, message: String!): Note!
  }
  
`;
