import { Request, Response } from "express";
const users = require("../../models/collection/user");
const jwt = require("jsonwebtoken");

module.exports = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SALT);
      const user = await users.findOneAndDelete({ id: decoded.id });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      } else {
        res.clearCookie("authorization", { path: "/" });
        res.status(200).json({
          message: "withdrawal done",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "server error",
    });
  }
};
