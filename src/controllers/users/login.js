const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("../controllermiddleware/bcrypt");

module.exports = async (req, res) => {
  try {
    const { id, password } = req.body;

    //유저 정보 가져오기
    const userInfo = await Users.findOne({
      id: id,
      social: "noSocial",
    });

    if (!userInfo) {
      res.status(403).json({ message: "There is no user information" });
    } else {
      //패스워드 비교하기
      const verified = await bcrypt.compare(password, id);

      if (!verified) {
        res.status(401).json({ message: "You wrote wrong password" });
      } else {
        const { id, username, email, admin, social } = userInfo;

        const payload = {
          id,
          username,
          email,
          admin,
          social,
        };

        // 토큰 생성
        const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

        //클라이언트와 이야기해보기
        res.cookie("authorization", token, {
          path: "/",
          domain: process.env.DOMAIN,
        });

        console.log("로그인 성공");
        res.status(200).json({ message: "Login Succeed", data: payload });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
