const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Address = sequelize.define(
  "Address",
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryCode: {
      type: DataTypes.STRING,
      defaultValue: "US"
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "address",
  }
);

module.exports = Address;
