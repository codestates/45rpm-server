const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    const userId = req.body.userData.id;
    const userInfo = await Users.findOne({ id: userId });
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
