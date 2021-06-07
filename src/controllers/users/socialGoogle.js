const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("../controllermiddleware/bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    console.log("리퀘 바디", req.body);
    const { email, name, picture } = req.body.data;

    // 구글 아이디
    const id = email.split("@")[0];

    // 비밀번호 지정 - 디폴트 비밀번호는 본인의 구글 이메일
    const encryptedPwd = bcrypt.encrypt(email);

    const findUser = await Users.findOne({
      id: id,
      social: "google",
    });
    console.log("유저 데이터 확인", findUser);

    // 기존에 똑같은 정보로 가입한 적 없을 때
    if (!findUser) {
      const newUser = new Users({
        id: id,
        password: encryptedPwd,
        username: name,
        email: email,
        profileUrl: !picture === true ? null : picture,
        thumbnailUrl: !picture === true ? null : picture,
        question: [],
        customizeSet: [],
        social: "google",
        admin: false,
      });

      newUser.save();

      const payload = {
        id: id,
        username: name,
        email: email,
        admin: false,
        social: "google",
      };

      const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

      res.cookie("authorization", token, { domain: process.env.DOMAIN });

      res
        .status(200)
        .json({ message: "Google Login Succeed", data: payload, token: token });
    } else {
      // 기존에 가입을 했을 경우
      const payload = {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        admin: findUser.admin,
        social: findUser.social,
      };

      const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

      res.cookie("authorization", token, { domain: process.env.DOMAIN });

      res
        .status(200)
        .json({ message: "Google Login Succeed", data: payload, token: token });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
