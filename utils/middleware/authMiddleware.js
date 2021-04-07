
const User = require('../../models/User');
const TokenHandler = require('../TokenHandler')
const tokenHandler = new TokenHandler()


/**
 * Express middleware used to authenticate requests.
 * @param {*} param0 
 * @returns 
 */
/*
const authMiddleware = async( req, res, next ) => {
    const refreshToken = req.cookies["refresh"];
    const accessToken = req.cookies["access"];
    const cognitoUser = await tokenHandler.getCognitoUserFromAccessToken(accessToken);

    if (!cognitoUser) {
      res.clearCookie("refresh");
      return next()
    } 
    const user = await User.findByPk(cognitoUser.username);
    req.user = user;
    res.cookie(["refresh", refreshToken, cookieOptions]);
    return next()
};*/

/*
// Set the cookie tokens in the request header.
  const setCookieTokens = (accessToken, refreshToken) => {
    const cookieOptions = {
      httpOnly: true,
      secure: (process.env.NODE_ENV === 'prod'),
    };
    return {
      access: ["access", accessToken, cookieOptions],
      refresh: ["refresh", refreshToken, cookieOptions]
    }
  }

  module.exports = {authMiddleware, setCookieTokens};*/