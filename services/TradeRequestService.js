const TradeRequest = require("../models/TradeRequest");
const Dealer = require("../models/Dealer");
const { findAll } = require("../models/Dealer");
const { Op } = require("sequelize");

class TradeRequestService {
  constructor() {}

  /** ----------------------------------------
   * Creates a new trade request for the specified deal
   * @param {Object} input the CreateTradeRequestInput from the client
   * @returns {Object} the created TradeRequestObject
   */
  async createTradeRequest(input) {
    const { requesterId, recipientId, dealId } = input;

    const newRequest = await TradeRequest.create({
      requesterId,
      recipientId,
      DealId: dealId,
    });

    const dealers = await Dealer.findAll({
      where: { id: { [Op.or]: { requesterId, recipientId },},},
    });

    var requester = dealers.filter(dealer => dealer.id === requesterId)
    var recipient = dealers.filter(dealer => dealer.id === recipientId)

    await Promise.all([
      newRequest.addRequester(requester),
      newRequest.addRecipient(recipient),
    ]);
    return newRequest;
  }



  /** ----------------------------------------
   * Specifies a return vehicle that from the
   * requested dealership.
   * @param {Object} input
   */
  async requestReturnVehicle(input) {
    const {tradeRequestId, vehicleId } = input;
    
    const tradeRequest = await TradeRequest.findOne({
      where: {id: tradeRequestId}
    });

    const returnVehicle = await Vehicle.findOne({where: {id: vehicleId}})
    tradeRequest.addReturnVehicle(returnVehicle);
    return tradeRequest;
  }



  async finalizeTradeRequest(tradeRequestId) {
    const request = await TradeRequest.findOne({
      where: {id: tradeRequestId}
    });
    if (!request) throw new ApolloError('Trade request not found.')
    await request.update({status: 'approved'});
    return req
  }


  /**
   * Declines a trade request
   */
  async declineTradeRequest(input) {
    const {requestId}
  }


  
  async sendTradeRequestMessage(tradeRequestId, message) {
    
  }
}

module.exports = TradeRequestService;
