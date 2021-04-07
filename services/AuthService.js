
const VerifyService = require("./VerifyService");
const { ApolloError } = require("apollo-server-errors");
const { User, Token } = require("../models");
const jwt = require('jsonwebtoken');
const { getAccessTokenFromRequest } = require("../utils/requestHandlers");


class AuthService {
  constructor() {
    this._verify = new VerifyService();
  }

  /** ----------------------------------------------
   * Attempts to sign in the user. Adds refreshToken
   * to cookie, sends accessToken in response.
   * @param {String} email 
   * @param {String} password  
   * @param {Object} res the http response object
   */
  async signIn(email, password, res) {

    console.log('AT THE SIGN IN RESOLVER')
    const user = await User.findOne({ where: { email: email } });
    
    // 1. Check for existing account.
    if (user) {
      // 2. Ensure passwords match.
      if (user.matchesPassword(password)) {
        // 3. Sign auth tokens and return them to the client.
        const {refreshToken, accessToken} = await user.authCredentials()
        res.cookie("REFRESH", refreshToken, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
        });
        return {user: user.dataValues, accessToken: accessToken};
      } else {
        throw new ApolloError("Incorrect password.");
      }
    }
    throw new ApolloError("Account not found.");
  }

  /** ----------------------------------------------
   * Attemps to refresh the users access token, using
   * the refresh token from the cookie.
   * @param {Object} req the HTTP request object
   * @param {Object} res the HTTP response object
   */
  async refreshAccessToken(req) {
    const refreshToken = getRefreshTokenFromRequest(req);
    const registeredToken = Token.findOne({where: {token: refreshToken}});
    if (!registeredToken) {
      throw new AuthenticationError('Unauthorized request.', 'UNAUTHORIZED')
    }
    const iat = new Date().getTime();
    const payload = jwt.verify(registeredToken.token, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = jwt.sign({iat, ...payload}, 
      process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
    return accessToken
  }

  
  async getTokenUser(req) {
    const accessToken = getAccessTokenFromRequest(req);
    console.log("GOT ACCESS TOKEN", accessToken)
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if (!payload) throw new ApolloError("Unauthorized request.", "UNAUTHORIZED")
    const currentUser = await User.findByPk(payload.sub)
    return currentUser
  }


  async _createRootAccount(uuid, password) {
    this._createCognitoRootUser(uuid, password)
      .then(() => {
        return this._confirmCognitoRootUser(uuid);
      })
      .catch((err) => {
        throw new ApolloError("COGNITO_ERROR", err);
      });
  }
}

module.exports = AuthService;
