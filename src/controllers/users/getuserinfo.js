const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    // JWT 토큰을 거친 유저 정보 인증이 되었는지 확인
    const userId = req.body.userData.id;
    const socialKind = req.body.userData.social;

    // 인증된 유저의 정보
    const userInfo = await Users.findOne({ id: userId, social: socialKind });
    const {
      id,
      username,
      email,
      admin,
      social,
      question,
      customizeSet,
      profileUrl,
    } = userInfo;

    // 유저의 정보를 담아 보내줄 payload 객체 생성
    const payload = {
      id,
      username,
      email,
      admin,
      social,
      question,
      customizeSet,
      profileUrl,
    };
    res.status(200).json({ message: "get userinfo", data: payload });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
