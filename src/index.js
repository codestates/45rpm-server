const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const session = require("express-session");
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongooseConfig = require("./config/mongoose");

const app = express();
//몽고db와 연결위한 mongoose 설정값 적용
const db = mongooseConfig();

//세션 설정
app.use(
  session({
    secret: "@Black Cicle",
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: process.env.DOMAIN,
      path: "/",
      maxAge: 60 * 60 * 1000,
      samesite: "none",
      httpOnly: true,
      secure: true,
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors 옵션
const option = {
  credentials: true,
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  origin: process.env.ORIGIN,
};

//cors 적용
app.use(cors(option));
//upload 미들웨어 적용
app.use(express.static("src/middleware/uploads"));

app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`45rpm server is running on ${port}`);
});
