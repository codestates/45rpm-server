const mongoose = require("mongoose");
// import { mongoose } from "../index";
const Schema = mongoose.Schema;

const customSchema = new Schema(
  {
    color: String,
    albumPic: String,
    recordPic: String,
    title: String,
    songList: Array,
    share: Boolean,
    order:{
      address: String,
      orderPersonName: String,
      orderPrice: String,
      orderState: Boolean
    }
  },
  { versionKey: false },
)

const questionSchema = new Schema(
  {
    category: String,
    title: String,
    contents: String,
    reply: {
      replyText: String
    },
    replyCheck: Boolean
  },
  { versionKey: false },
)

const userSchema = new Schema(
  {
    id: String,
    password: String,
    username: String,
    email: String,
    admin: Boolean,
    social: Boolean,
    question: [questionSchema],
    customizeSet: [customSchema],
  },
  { versionKey: false },
);


module.exports = mongoose.model("User", userSchema);
