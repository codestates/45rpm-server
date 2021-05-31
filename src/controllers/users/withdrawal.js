const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    const decodedData = req.body.userData;
    const user = await Users.findOneAndDelete({ id: decodedData.id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
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
