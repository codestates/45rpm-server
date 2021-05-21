import { Request, Response } from "express";
const Users = require("../../models/collection/User");
import { encrypt } from "../controllermiddleware/bcrypt";

module.exports = async (req: Request, res: Response) => {
  try {
    const { id, password, username, email } = req.body;
    //회원 id 찾기
    const userDataId = await Users.findOne({
      id: id,
    });

    //회원 email 찾기
    const userDataEmail = await Users.findOne({
      email: email,
    });

    //아이디나 이메일이 중복되지 않는다면 유저 데이터 생성
    if (!userDataId && !userDataEmail) {
      //패스워드 숫자만인경우 toString처리 추가하기
      const encryptedPwd = encrypt(password);
      const userModel = new Users({
        id,
        password: encryptedPwd,
        username,
        email,
        question: [],
        customizeSet: [],
        social: false,
        admin: false,
      });

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
    } else {
      //아이디 이메일중 하나라도 중복값이 존재하면 에러
      res.status(403).json({ message: "Same user existed" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
