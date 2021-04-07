const { gql } = require("apollo-server-express");

module.exports = gql`

scalar DateTime

  type Appointment {
    id: ID!
    time: DateTime!
    type: AppointmentType!
    user: User
    vehicle: Vehicle
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateAppointmentInput {
    type: AppointmentType!
    customerId: String!
    vehicleId: String!
  }


  input UpdateAppointmentInput {
    time: DateTime
  }

  enum AppointmentType {
    service
    sales
  }
`;