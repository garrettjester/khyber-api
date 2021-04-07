const passport = require('passport');
const {User} = require('../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


// Set up strategy options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET
};


// Create strategy
const jwtLogin = new JwtStrategy(jwtOptions, async(payload, done) => {
  // See if the user ID in the payload exists in the DB. 
  // If it does, call done with a User object.
  const user = await User.findByPk(payload.sub)
  if (!user) done(Error('User not found.', false), false);
  done(null, user);
});


passport.use(jwtLogin);