const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Dealer = sequelize.define(
  "Dealer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dealerCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: "dealer",
  }
);



module.exports = Dealer;
