import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    category: String,
    title: String,
    contents: String,
    reply: Object,
    replyCheck: Boolean,
  },
  { versionKey: false },
);

module.exports = mongoose.model("Question", questionSchema);
