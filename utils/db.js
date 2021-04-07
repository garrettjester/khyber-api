/**
 *  Database Connection.
 *  -------------------
 *  Connects Sequelize to the Khyber DB.
 */

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PWD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: "postgres",
  }
);

(async () => {
  await sequelize.authenticate();
})();

(async () => {
  await sequelize.sync({ force: true });
})();

module.exports = { sequelize };
