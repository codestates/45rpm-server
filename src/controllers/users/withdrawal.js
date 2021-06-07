const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    // 인증된 유저 정보
    const decodedData = req.body.userData;
    const user = await Users.findOneAndDelete({ id: decodedData.id });
    if (!user) {
      // 일치하는 유저 정보가 없을 시
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      // 일치하는 유저 정보 존재할 시 회원탈퇴 로직 실행
      res.clearCookie("authorization", { path: "/" });
      res.status(200).json({
        message: "withdrawal done",
      });
      console.log("탈퇴 완료");
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
