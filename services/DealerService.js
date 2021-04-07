
const { Address, User, Dealer, Customer} = require('../models');
const AuthService = require('./AuthService');
const VerifyService = require('./VerifyService');
const {ApolloError} = require('apollo-server-express');
const { v4: uuidv4 } = require("uuid");

class DealerService {
  constructor () {
    this._auth = new AuthService()
    this._verify = new VerifyService()
  }

  /** ----------------------------------------------
   * Sends a confirmation code to the root user's
   * email to confirm ownership, before creating a
   * dealership.
   * @param {String} email 
   * @returns {Object} A success message
   */
  async verifyRootEmail(email) {
    const existingUser = await User.findOne({where: {email}})
    if (existingUser) throw new ApolloError('Email already in use.')
    return this._verify.create('email', email, 'en')
  }


  /** ----------------------------------------------
   * Checks to ensure that the user-entered verification
   * code matches what was sent to their email.
   * @param {String} email - The root user's email
   * @param {String} code - The user-entered code
   * @returns {Object} A success message
   */
  async confirmRootEmail(email, code) {
    return this._verify.confirm(email, code)
  }


  /** ----------------------------------------------
   * Configures a Dealer account with a root user and 
   * primary address.
   * @param {CreateDealerInput} input - 
   * @returns {Dealer} - The created dealer object
   */
  async createDealer(input, res) {
    var {user, dealer, address} = input;

    // 1. Configure the root user.
    const rootUserParams = {
      ...user, 
      id: uuidv4(),
      role: 'root', 
      permissions: ['ROOT', 'USER', 'ADMIN'],
      accountStatus: 'confirmed'
    };
    const rootUser = await User.create({...rootUserParams});

    // 2 Create the dealer's address.
    const {id} = await Address.create({...address});
    dealer.AddressId = id;

    // 3. Create the new dealer. 
    const newDealer = await Dealer.create({...dealer});
    await newDealer.addUser(rootUser);
    const {accessToken, refreshToken} = await rootUser.authCredentials();

    // 4. Sign in the new root user. 
    res.cookie("REFRESH", refreshToken, {
      httpOnly: true,
      maxAge: 3600000 * 24 * 7,
    });
    console.log("DEALER ROOT ACCESS TOKEN", accessToken)
    return {user: rootUser, accessToken: accessToken};
  };



  async getDealerEmployees(dealerId) {
    return User.findAll({
      where: {DealerId: dealerId},
      order: [['lastName', 'ASC']]
    });
  };


  async getDealerCustomers(dealerId) {
    return Customer.findAll({where: {DealerId: dealerId}})
  }

  async getDealer(id) {
    return Dealer.findByPk(id)
  }


  async deleteDealer(input) {

  }
}




module.exports = DealerService;