import * as express from "express";
// import { Request, Response, NextFunction } from "express";
const app = express();
require("dotenv").config();
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("45rpm server 정상 동작");
// });

app.get("/", (req, res, next) => {
  res.send("45rpm server 정상 동작");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`45rpm server is running on ${port}`);
});
