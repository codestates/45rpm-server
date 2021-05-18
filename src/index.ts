import * as express from "express";
import * as cors from "cors"
const router = require("./routes/index");
const session = require("express-session")
require("dotenv").config();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongooseConfig = require("./config/mongoose");


const app = express();
const db = mongooseConfig();


//클라이언트 연결 뒤 확인
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
      secure: true
    }
  })
)



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors 옵션
const option: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,POST,PATCH,DELETE,OPTIONS",
  origin: process.env.ORIGIN
}

app.use(
  cors(option)
)

app.use("/", router);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`45rpm server is running on ${port}`);
});

export { mongoose };
