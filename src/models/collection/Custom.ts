import { mongoose } from "../../index";
const Schema = mongoose.Schema;

const customSchema = new Schema(
  {
    color: String,
    albumPic: String,
    recordPic: String,
    title: String,
    songList: Array,
    share: Boolean,
    order: {
      address: String,
      orderPersonName: String,
      orderPrice: String,
      orderState: Boolean,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("Custom", customSchema);
