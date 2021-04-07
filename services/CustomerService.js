const { Customer, Dealer } = require("../models");


class CustomerService {
  constructor(){}

  async createCustomer(input, user) {
    const newCustomer = await Customer.create({...input})
    const dealer = await Dealer.findByPk(user.DealerId)
    await dealer.addCustomer(newCustomer)
    return newCustomer
  }
}


module.exports = CustomerService;