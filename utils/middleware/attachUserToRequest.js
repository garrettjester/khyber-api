
const { ApolloError } = require('apollo-server-errors');
const { User } = require('../../models')
const {getAccessTokenFromRequest} = require('../requestHandlers')
const TokenHandler = require('../TokenHandler')
const tokenHandler = new TokenHandler()


// Attaches the Khyber user to the request header so that
// resolvers can access it.
module.exports = getUserFromRequest = async(req) => {
  try {
    const accessToken = getAccessTokenFromRequest(req)
    const cognitoUser = await tokenHandler.getCognitoUserFromAccessToken(accessToken)
    const user = await User.findByPk(cognitoUser.username);
    if (!user) {
      throw new ApolloError("Not authroized.", "UNAUTHORIZED")
    }
    req.user = user
    return user
  } catch(error) {
    const dummy = 1
  }
}