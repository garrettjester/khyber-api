const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");
const bcrypt = require("bcrypt");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const Token = require('../models/Token');

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ["USER"],
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        validatePassword: (value) => {
          const pwdRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          if (!value.match(pwdRgx)) {
            throw new ApolloError("Password does not meet requirments.");
          }
        },
      },
    },

    accountStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "invited",
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "user",
  }
);

// Creates a DB-friendly encrypted password.
const hashPassword = async (user) => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(user.password, salt);
  return (user.password = hash);
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

// ----------------
// INSTANCE METHODS
// ----------------

// Generates an access token (JWT) for the user.
User.prototype.accessToken = async function() {
  const { id, username, roles } = this;
  const iat = new Date().getTime();
  return jwt.sign(
    {
      iat,
      sub: id,
      username: username,
      roles: roles,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// Generates a refresth token (JWT) for the user.
User.prototype.refreshToken = async function() {
  const iat = new Date().getTime();
  const { id, username, roles } = this;
  try {
    let refreshToken = jwt.sign(
      {
        iat,
        sub: id,
        username: username,
        roles: roles,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    await Token.create({token: refreshToken});
    return refreshToken
  } catch (err) {
    console.error(err);
  }
};


User.prototype.authCredentials = async function() {
  console.log('ATTEMPTING TO FETCH AUTH CREDENTIALS')
  const accessToken = await this.accessToken()
  const refreshToken = await this.refreshToken()
  return {accessToken, refreshToken}
}

// Determines whether if user has entered correct password.
User.prototype.matchesPassword = async function(candidatePassword) {
  console.log("CANDIDATE PASSWORD", candidatePassword)
  console.log("CURRENT PASSWORD", this.password)
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log("IS MATCH",isMatch)
    if (err) throw err;
    return isMatch;
  });
};

module.exports = User;
