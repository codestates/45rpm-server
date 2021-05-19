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
    question: Array,
    customizeSet: Array,
  },
  { versionKey: false },
);

module.exports = mongoose.model("User", userSchema);
