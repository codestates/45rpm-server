import * as express from "express";
const app = express();
const router = require("./routes/index");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongooseConfig = require("./config/mongoose");
const db = mongooseConfig();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`45rpm server is running on ${port}`);
});

export { mongoose };
