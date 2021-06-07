const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    // JWT 토큰을 거친 유저 정보 인증이 되었는지 확인
    const { id } = req.body.userData;
    const myCustoms = await Customs.find({ userId: id });

    //해당 유저의 모든 커스텀 목록 send
    res.status(200).json({ message: "show my all Customs", data: myCustoms });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
