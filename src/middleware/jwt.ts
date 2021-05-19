import { NextFunction, Request, Response } from "express";

//토큰에 대한 처리만 진행
const jwt = require("jsonwebtoken");

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  const validation = req.headers.authorization;
  if (!validation) {
    res.status(401).json({ message: "Who are you?" });
  } else {
    const token = validation.split(" ")[1];
    const userData = await jwt.verify(token, process.env.SALT);
    if (!userData) {
      res.status(401).json({ message: "You have wrong access token" });
    }
    req.body = { ...req.body, userData };
  }
  next();
};
