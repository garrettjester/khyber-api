const { Address, Dealer } = require('../../models');
const UserService = require('../../services/UserService');
const userService = new UserService()
const getUserFromRequest = require('../../utils/middleware/attachUserToRequest')

const User = {
  dealer: (user, {req}) => {
    return Dealer.findByPk(user.DealerId)
  },

  deals: (user) => {
    return userService.getUserDeals(user.id)
  },
  address: (user) => {
    return AddressLoader.load(user.addressId).then(address => Address)
  }
};

async function createUser(_, {input}, {req}) {
  return userService.createUser(input, req)
}

async function loadUser(_, {}, {req}) {
  return Au
}


module.exports = {
  Query: {
    loadUser
  },
  Mutation: {
    createUser
  },
  User
};
