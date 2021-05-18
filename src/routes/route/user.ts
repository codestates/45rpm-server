// const express = require("express");
const usersController = require("../../controllers");
// const router = express.Router();
const jwtMiddleware = require('../../middleware/jwt');

import { express, router } from "../index";

//토큰 인증 필요 없는 라우팅
router.post("/login", usersController.users.login);
router.post("/signup", usersController.users.signup);

//토큰 인증 필요한 라우팅
router.post("/logout", jwtMiddleware, usersController.users.logout);
router.patch("/updateinfo", jwtMiddleware, usersController.users.updateinfo);
router.delete("/withdrawal", jwtMiddleware, usersController.users.withdrawal);
router.post("/question/add", jwtMiddleware, usersController.users.addquestion);
router.patch("/question/update", jwtMiddleware, usersController.users.questionupdate);
router.get("/question/questionlist", jwtMiddleware, usersController.users.questionlist);
router.delete("/question/delete", jwtMiddleware, usersController.users.questiondelete);
router.post("/question/addreply", jwtMiddleware, usersController.users.addquestionreply);
router.post("/order/addorder", jwtMiddleware, usersController.users.addcustomorder);
router.patch("/order/updateorder", jwtMiddleware, usersController.users.updateorder);

module.exports = router;
