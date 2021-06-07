//토큰에 대한 처리만 진행
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //요청 헤더에 토큰이 존재하는지 확인
    const validation = req.headers.authorization;
    console.log("소셜토큰확인", validation);
    if (!validation) {
      //토큰이 없을때의 응답
      res.status(401).json({ message: "Who are you?" });
    } else {
      //잘못된 토큰인지 확인
      const token = validation.split(" ")[1];
      const userData = await jwt.verify(token, process.env.SALT);
      if (!userData) {
        //잘못된 토큰일 때의 응답
        res.status(401).json({ message: "You have wrong access token" });
      }
      //토큰 검증 과정을 통과한 후 다음 미들웨어로 전달되는 body값
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
