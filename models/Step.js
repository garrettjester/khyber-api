const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db.js");

const Step = sequelize.define(
  "Step",
  {
    position: {
      field: "step_position",
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      field: "step_type",
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      field: "step_status",
      type: DataTypes.STRING,
    },
    startedAt: {
      field: "step_started_at",
      type: DataTypes.DATE
    }
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: "step",
  }
);

module.exports = Step;
