const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: String,
    password: String,
    username: String,
    email: String,
    profileUrl: String,
    thumbnailUrl: String,
    admin: Boolean,
    social: Boolean,
    question: Array,
    customizeSet: Array,
  },
  { versionKey: false },
);

module.exports = mongoose.model("User", userSchema);
