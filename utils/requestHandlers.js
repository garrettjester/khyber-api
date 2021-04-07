const { AuthenticationError } = require("apollo-server-express");

const getAccessTokenFromRequest = (req) => {
  console.log("ATTEMPTING TO GET ACCESS TOKEN")
  if (!(
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )) {
    throw new AuthenticationError("Access token not present.", "INVALID_CREDENTIALS");
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  return accessToken;
};


const getRefreshTokenFromRequest = (req) => {
console.log("REQ.COOKIES[REFRESH]", req.cookies["REFRESH"])
  if (!(req.cookies && req.cookies["REFRESH"])) {
      throw new AuthenticationError(
          "Refresh token not present.", "INVALID_CREDENTIALS"
      );
  }
  return req.cookies["REFRESH"]
}


module.exports = {
  getAccessTokenFromRequest, 
  getRefreshTokenFromRequest
}
