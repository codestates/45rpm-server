const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  const db = mongoose.connect(config.db.development, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  if (!db) {
    // 데이터베이스 연결이 정상적으로 이루어지지 않았을 시
    console.log("Cannot find Mongo DB");
  } else {
    // 데이터베이스 연결 성공
    require("../models");
    console.log("Mongo DB is connected");
    return db;
  }
};
