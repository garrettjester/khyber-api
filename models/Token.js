const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db')


const Token = sequelize.define("Token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = Token;