const { gql } = require("apollo-server-express");

module.exports = gql`

directive @auth(
    requires: UserPermission = root,
) on FIELD_DEFINITION

type User {
  id: ID!
  firstName: String!
  lastName: String!
  role: UserRole!
  email: String
  address: Address
  appointments: [Appointment]
  deals: [Deal]
  accountStatus: AccountStatus
  createdAt: DateTime!
  updatedAt: DateTime!
  dealer: Dealer!
}

input CreateUserInput {
  firstName: String!
  lastName: String!
  role: UserRole!
  phoneNumber: String
  email: String
}

input UpdateUserInput {
  firstName: String
  lastName: String
  phoneNumber: String
  email: String
}

enum AccountStatus {
  invited
  confirmed
}

enum UserRole {
  root
  admin
  sales
  trader
  finance_insurance
  accounting
}

enum UserPermission {
  ROOT
  ADMIN
  USER
}

type Mutation {
  createUser(input: CreateUserInput!): User! @auth(requires: ADMIN)
  deleteUser(id: ID!): SuccessMessage! @auth(requires: ADMIN)
  updateUser(input: UpdateUserInput!): User! @auth(requires: USER)
}

type Query {
  loadUser: User! 
  getUser(id: ID!): User! @auth(requires: USER)
}


`;