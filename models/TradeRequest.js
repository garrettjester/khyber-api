const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");
const {Dealer} = require("../models")


const TradeRequest = sequelize.define(
  "TradeRequest",
  {
    requesterId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dealer,
        key: 'id'
      }
    },
    recipientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dealer,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'trade_requests'
  }
);



module.exports = TradeRequest;




