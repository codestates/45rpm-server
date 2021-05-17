// const express = require("express");
const usersController = require("../../controllers");
// const router = express.Router();
// const jwtMiddleware = require('../middleware/jwtToken');

import { express, router } from "../index";

router.post("/login", usersController.users.login);
router.post("/logout", usersController.users.logout);
router.post("/signup", usersController.users.signup);
router.patch("/updateinfo", usersController.users.updateinfo);
router.delete("/withdrawal", usersController.users.withdrawal);
router.post("/question/add", usersController.users.addquestion);
router.patch("/question/update", usersController.users.questionupdate);
router.get("/question/questionlist", usersController.users.questionlist);
router.delete("/question/delete", usersController.users.questiondelete);
router.post("/question/addreply", usersController.users.addquestionreply);
router.post("/order/addorder", usersController.users.addcustomorder);
router.patch("/order/updateorder", usersController.users.updateorder);

module.exports = router;
