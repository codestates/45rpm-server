import { Request, Response } from "express";
const users = require("../../models/collection/user");
const bcrypt = require("bcrypt")

module.exports = async (req: Request, res: Response) => {
  const {id, password, username, email} = req.body

   //패스워드 숫자만인경우 toString처리 추가하기
   const encryptedPwd = bcrypt.hashSync(password, 10)

  const userModel = new users({id, password:encryptedPwd, username, email, question:[], customizeSet: []});

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
