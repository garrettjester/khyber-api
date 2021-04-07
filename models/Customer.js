const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Customer = sequelize.define(
  "Customer",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    insurance: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: "customer",
  }
);

module.exports = Customer;
