const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require('axios');

class TokenHandler {
  constructor() {}

  async getCognitoUserFromAccessToken(accessToken) {
    if (accessToken) {
      const keys = await this._getCognitoKeys()
      const jwk = keys[1];
      const pem = jwkToPem(jwk);
      const cogitoUser = jwt.verify(accessToken, pem);
      return cogitoUser;
    }
    return null
  }


  async validateRefreshToken(refreshToken) {
    const keys = await this._getCognitoKeys()
    const jwk = keys[1];
    const pem = jwkToPem(jwk);
  }


  async _getCognitoKeys() {
    return axios.get(
      `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
    )
    .then(({data: { keys }}) => keys)}
}


module.exports = TokenHandler;