const { gql } = require("apollo-server-express");

module.exports = gql`

  type AuthPayload {
    user: User!
    accessToken: String!
  }


  type Query {
    currentUser: User!
    refreshAccessToken: String!
    signIn(email: String, password: String): AuthPayload! 
  }

  type Mutation {
    logOut: SuccessMessage!
    updatePassword(password: String): SuccessMessage!
  }

`;