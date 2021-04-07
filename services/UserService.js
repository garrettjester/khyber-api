const User = require('../models/User');
const Dealer = require('../models/Dealer');
const EmailSender =require('./EmailSender');
const AuthService = require('./AuthService');
const { v4: uuidv4 } = require("uuid");
const tempPassword = require('../utils/PasswordGenerator')

class UserService {

  constructor() {
    this._auth = new AuthService()
    this._emailSender = new EmailSender()
  }

  async createUser(input, req) {
    const {firstName, email} = input;
    
    // Get the dealer from the request. 
    const dealer = await Dealer.findOne({where: {id: req.user.DealerId}})

    const newUserParams = {
      id: uuidv4(),
      password: tempPassword(),
      ...input,
    }

    const {uuid, tempPassword} = await this._auth.createSubUser();
    input.id = uuid;
    const newUser = await User.create({...input});
    await dealer.addUser(newUser)
    await this._emailSender.sendWelcomeEmail(
      email, firstName, dealer.name, tempPassword
    );
    return newUser;
  };



  async deleteUser(id) {
    return User.destroy({where: {id}})
  }

}

module.exports = UserService;