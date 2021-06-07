require("dotenv").config();

module.exports = {
  // DB 연결시 제공할 환경 변수 선언
  db: {
    production: process.env.DATABASEHOST,
    development: process.env.DATABASEHOST,
    test: process.env.DATABASEHOST,
  },
};
