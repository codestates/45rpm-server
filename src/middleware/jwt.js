//토큰에 대한 처리만 진행
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const validation = req.headers.authorization;
    console.log("소셜토큰확인", validation);
    if (!validation) {
      res.status(401).json({ message: "Who are you?" });
    } else {
      const token = validation.split(" ")[1];
      const userData = await jwt.verify(token, process.env.SALT);
      if (!userData) {
        res.status(401).json({ message: "You have wrong access token" });
      }
      req.body = { ...req.body, userData };
    }
    next();
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: "You have problem in authorization check step" });
  }
};
