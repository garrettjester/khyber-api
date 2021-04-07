const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Appointment = sequelize.define(
  "Appointment",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtype: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "appointment",
  }
);

module.exports = Appointment;
