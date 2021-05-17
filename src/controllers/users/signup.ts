import { Request, Response } from "express";
const users = require("../../models/collection/user");

module.exports = async (req: Request, res: Response) => {
  const userModel = new users(req.body);

  userModel
    .save()
    .then((newUser: Object) => {
      console.log("create 완료");
      res.status(200).json({
        message: "Create success",
        data: {
          user: newUser,
        },
      });
    })
    .catch((err: any) => {
      console.log("실패!");
      res.status(500).json({
        message: err,
      });
    });
};
