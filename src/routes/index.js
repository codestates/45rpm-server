const express = require("express");
const router = express.Router();
const userRouter = require("./route/user");
const customRouter = require("./route/custom");

router.get("/", (req, res, next) => {
  res.send("45rpm server 정상 동작");
});

router.use("/user", userRouter);
router.use("/customs", customRouter);

// export { router };
module.exports = router;
