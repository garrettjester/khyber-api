const AuthService = require("../../services/AuthService");
const auth = new AuthService();

async function signIn(_, { email, password }, { res }) {
  const signInResp = await auth.signIn(email, password, res);
  return signInResp;
}

async function currentUser(_, {}, {req}) {
  console.log("ATTEMPTING TO LOAD CURRENT USER")
  return auth.getTokenUser(req)
}

async function refreshAccessToken(_, {}, { req, res }) {
  return auth.refreshAccessToken(req, res);
}

async function updatePassword(_, { password }, { req }) {
  return auth.updatePassword(password);
}

async function logOut(_, {}, { res }) {
  res.cookie('REFRESH', '', { maxAge: 0 });
  return { success: true, message: "Successfully logged out." };
}

module.exports = {
  Query: {
    currentUser,
    refreshAccessToken,
    signIn,
  },
  Mutation: {
    logOut,
    updatePassword,
  },
};
