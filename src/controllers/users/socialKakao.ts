import { Request, Response } from "express";
const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
import { encrypt } from "../controllermiddleware/bcrypt";

module.exports = async (req: Request, res: Response) => {
  try {
    const email: String = req.body.data.kakao_account.email;
    const id: String = email.split("@")[0]; // 자신의 카카오톡 id
    const encryptedPwd: String = encrypt(email);

    /**
     * 일단 엑세스토큰을 만들어줘야 하기 때문에 현재 받아올 수 있는 유일하고 고유한 값인 email로 username, id, password를 다 만들거임
     * password는 email 전체를 입력하는 걸로
     */

    const findUser = await Users.findOne({
      email: email,
    });

    if (!findUser) {
      const newUser = new Users({
        id: id,
        password: encryptedPwd,
        username: id,
        email: email,
        question: [],
        customizeSet: [],
        social: true,
        admin: false,
      });

      newUser.save();
    }
    const payload = {
      id: id,
      username: id,
      email: email,
      admin: false,
      social: true,
    };

    const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

    res.cookie("authorization", token);

    res.status(200).json({ message: "Kakao Login Succeed", data: payload });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
