const CustomerService = require("../../services/CustomerService")
const customerService = new CustomerService()

const Customer = {
  appointments: (customer,_,{}) => {

  }
}


async function createCustomer(_, {input}, {req}) {
  return customerService.createCustomer(input, req.user)
}


async function deleteCustomer(_, {id}, {req}) {
  return customerService.deleteCustomer(id)
}


module.exports = {
  Mutation: {
    createCustomer,
    deleteCustomer
  },
  Customer
}