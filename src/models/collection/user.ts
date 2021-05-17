const mongoose = require("mongoose");
// import { mongoose } from "../index";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: String,
    password: String,
    username: String,
    email: String,
    admin: Boolean,
    social: Boolean,
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", userSchema);
