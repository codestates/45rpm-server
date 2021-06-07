const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  if (!req.body.id) {
    // 인증 정보가 들어오지 않을 시
    return res.status(400).end();
  }
  const id = req.body.id;
  try {
    const data = await Users.findOne({ id: id });
    if (!data) {
      // 들어온 아이디가 유효하지 않은 유저의 아이디일 때
      return res.json({ data: null, message: "no exist" });
    }

    // 유저 정보를 기반으로 토큰을 만들기 위한 payload 객체 생성
    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
      admin: data.admin,
      social: data.social,
    };

    const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

    // 쿠키에 생성한 토큰을 할당
    res.cookie("authorization", token, {
      path: "/",
      domain: process.env.DOMAIN,
    });

    res.status(200).json({ message: "Check Succeed", data: payload });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
