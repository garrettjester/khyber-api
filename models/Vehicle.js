const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");


const Vehicle = sequelize.define("Vehicle", {
  vin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commissionNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {tableName: 'vehicles'}
);


module.exports = Vehicle;