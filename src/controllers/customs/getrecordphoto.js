const Customs = require("../../models/collection/Custom");
const path = require("path");

module.exports = async (req, res) => {
  try {
    // JWT 토큰을 거친 유저 정보 인증이 되었는지 확인
    const { id } = req.body.userData;
    const myCustoms = await Customs.find({ userId: id });

    // 해당 유저의 센터커버 이미지 정적 파일 클라이언트에 제공
    res.status(200).sendFile("public/index.html", {
      root: path.join(myCustoms[0].recordPic),
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
