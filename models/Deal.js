const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Deal = sequelize.define(
  "Deal",
  {
    financing: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tradeIn: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "deal",
  }
);

module.exports = Deal;
