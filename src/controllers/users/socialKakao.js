const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("../controllermiddleware/bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    console.log("데이터", req.body.data);
    // if (
    //   // // !req.body.data.kakao_account.email ||
    //   // !req.body.data.kakao_account.profile.nickname
    // ) {
    //   res.status(403).json({
    //     message: "You should agree all our authorization asking list",
    //   });
    // } else {
    const {
      email,
      profile: { nickname, profile_image_url, thumbnail_image_url },
    } = req.body.data.kakao_account;

    const id = nickname; // 자신의 카카오톡 id
    const encryptedPwd = bcrypt.encrypt(email);

    /**
     * 일단 엑세스토큰을 만들어줘야 하기 때문에 현재 받아올 수 있는 유일하고 고유한 값인 email로 username, id, password를 다 만들거임
     * password는 email 전체를 입력하는 걸로
     */

    const findUser = await Users.findOne({
      id: id,
      social: "kakao",
    });
    console.log("유저 데이터 확인", findUser);

    // 기존에 똑같은 정보로 가입한 적 없을 때
    if (!findUser) {
      const newUser = new Users({
        id: id,
        password: encryptedPwd,
        username: nickname,
        email: email,
        profileUrl: !profile_image_url === true ? null : profile_image_url,
        thumbnailUrl:
          !thumbnail_image_url === true ? null : thumbnail_image_url,
        question: [],
        customizeSet: [],
        social: "kakao",
        admin: false,
      });

      newUser.save();

      const payload = {
        id: id,
        username: nickname,
        email: email,
        admin: false,
        social: "kakao",
      };

      const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

      res.cookie("authorization", token, { domain: process.env.DOMAIN });
      res.status(200).json({ message: "Kakao Login Succeed", data: payload });
    } else {
      // 기존에 이미 가입한 유저일 때
      const payload = {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        admin: findUser.admin,
        social: findUser.social,
      };

      const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

      res.cookie("authorization", token, { domain: process.env.DOMAIN });

      res.status(200).json({ message: "Kakao Login Succeed", data: payload });
    }
    // }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
