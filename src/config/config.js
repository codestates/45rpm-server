require("dotenv").config();

module.exports = {
  db: {
    production: process.env.DATABASEHOST,
    development: process.env.DATABASEHOST,
    test: process.env.DATABASEHOST,
  },
};
