const express = require("express");
const router = express.Router();
const userRouter = require("./route/user");
const customRouter = require("./route/custom");

//기본 서버 url로 접속시 정상작동임을 확인하기 위한 라우팅
router.get("/", (req, res, next) => {
  res.send("45rpm server 정상 동작");
});

//요청별 1차 라우팅 분기
router.use("/user", userRouter);
router.use("/customs", customRouter);

// export { router };
module.exports = router;
