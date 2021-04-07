const Address = require('./Address');
const Appointment = require('./Appointment');
const Customer = require('./Customer');
const Deal = require('./Deal');
const Dealer = require('./Dealer');
const User = require('./User');
const Step = require('./Step');
const Token = require('./Token');
const TradeRequest = require('./TradeRequest');
const Vehicle = require('./Vehicle')

Dealer.hasMany(User);
Dealer.hasMany(Appointment);
Dealer.hasMany(Customer);
Dealer.hasMany(Vehicle);

Address.hasOne(Dealer);
User.belongsTo(Address);
User.hasMany(Deal);
User.hasMany(Appointment);
User.hasMany(Customer, {as: "poc"});

Customer.hasMany(Appointment);
Customer.belongsTo(Address);

Deal.hasMany(Step);
Deal.belongsTo(User);
Deal.belongsTo(Dealer);

Vehicle.belongsTo(Deal);
Vehicle.belongsTo(Appointment);

TradeRequest.belongsTo(Deal)
TradeRequest.belongsTo(Vehicle, {foreignKey: 'returnId', as: 'ReturnVehicle'})
TradeRequest.belongsTo(Dealer, {foreignKey: 'requesterId', as: 'Requester'})
TradeRequest.belongsTo(Dealer, {foreignKey: 'recipientId', as: 'Recipient'})


Address.sync()
Appointment.sync()
Customer.sync()
Deal.sync()
Dealer.sync()
Step.sync()
Token.sync()
TradeRequest.sync()
User.sync()
Vehicle.sync()

module.exports = {
  Address,
  Appointment,
  Customer,
  Deal,
  Dealer,
  Step,
  Token,
  TradeRequest,
  User,
  Vehicle
};