const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  const db = mongoose.connect(config.db.development, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  if (!db) {
    console.log("Cannot find Mongo DB");
  } else {
    require("../models");
    console.log("Mongo DB is connected");
    return db;
  }
};
