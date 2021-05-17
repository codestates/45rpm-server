import * as express from "express";
const router = express.Router();
const userRouter = require("./route/user");
const customRouter = require("./route/custom");
// const jwtMiddleware = require("../middleware/jwtToken");

router.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("45rpm server 정상 동작");
  },
);

router.use("/user", userRouter);
router.use("/customs", customRouter);

export { router, express };
module.exports = router;
