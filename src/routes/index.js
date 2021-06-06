const express = require("express");
const router = express.Router();
const userRouter = require("./route/user");
const customRouter = require("./route/custom");

//서버 정상 작동을 위한 라우팅
router.get("/", (req, res, next) => {
  res.send("45rpm server 정상 동작");
});

//요청별 라우팅 분기 지점
router.use("/user", userRouter);
router.use("/customs", customRouter);

module.exports = router;
