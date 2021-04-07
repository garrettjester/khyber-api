const DealerService = require('../../services/DealerService');
const dealerService = new DealerService()

const Dealer = {
  employees: (dealer, _, {}) => {
    return dealerService.getDealerEmployees(dealer.id)
  },

  customers: (dealer, _, {}) => {
    return dealerService.getDealerCustomers(dealer.id)
  },

  appointments: (dealer, _, {dataLoaders: {AppointmentsLoader}}) => {
    return dealerService.getAppointments(dealer.id)
  },

  trades: (dealer, _, {dataLoaders: {TradesLoader}}) => {
    return dealerService.getTrades(dealer.id)
  }
};


async function verifyRootEmail(_, {email}, {req}) {
  return dealerService.verifyRootEmail(email)
}

async function confirmRootEmail(_, {email, code}) {
  return dealerService.confirmRootEmail(email, code)
}

async function createDealer(_, {input}, {res}) {
  return dealerService.createDealer(input ,res)
}

async function deleteDealer(_, {input}, {req}) {
  return dealerService.deleteDealer(input)
}

async function updateDealer(_, {input}, {req}) {
  return dealerService.deleteDealer(input)
}

async function getDealer (_, {id}, {req}) {
  return dealerService.getDealer(id)
}


module.exports = {
  Mutation: {
    createDealer,
    deleteDealer,
    updateDealer,
    verifyRootEmail,
    confirmRootEmail,
  },
  Query: {
    getDealer
  },
  Dealer
};