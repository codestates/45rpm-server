const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    userId: String,
    category: String,
    title: String,
    contents: String,
    reply: String,
    replyCheck: Boolean,
    createdAt: String,
  },
  { versionKey: false },
);

module.exports = mongoose.model("Question", questionSchema);
