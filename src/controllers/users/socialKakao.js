const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("../controllermiddleware/bcrypt");
require("dotenv").config();

module.exports = async (req, res) => {
  try {
    if (
      !req.body.data.kakao_account.email ||
      !req.body.data.kakao_account.profile.nickname
    ) {
      res.status(403).json({
        message: "You should agree all our authorization asking list",
      });
    } else {
      const {
        email,
        profile: { nickname, profile_image_url, thumbnail_image_url },
      } = req.body.data.kakao_account;

      const id = email.split("@")[0]; // 자신의 카카오톡 id
      const encryptedPwd = bcrypt.encrypt(email);

      /**
       * 일단 엑세스토큰을 만들어줘야 하기 때문에 현재 받아올 수 있는 유일하고 고유한 값인 email로 username, id, password를 다 만들거임
       * password는 email 전체를 입력하는 걸로
       */

      const findUser = await Users.findOne({
        id: id,
      });
      console.log("유저 데이터 확인", findUser);

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
          social: true,
          admin: false,
        });

        newUser.save();

        const payload = {
          id: id,
          username: nickname,
          email: email,
          admin: false,
          social: true,
        };

        const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

        res.cookie("authorization", token, { domain: process.env.DOMAIN });
        res.status(200).json({ message: "Kakao Login Succeed", data: payload });
      } else {
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
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
