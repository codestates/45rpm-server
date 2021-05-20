import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  if (req.body.userData) {
    const { admin, id } = req.body.userData;

    if (admin === true) {
      // user 가 admin일때
      const allUserQuestions = await Users.find();

      const allquestionArray = [];
      for (let i = 0; i < allUserQuestions.length; i++) {
        for (let k = 0; k < allUserQuestions[i].question.length; k++) {
          allquestionArray.push(allUserQuestions[i].question[k]);
        }
      }

      res.status(200).json({
        message: "questions of all users",
        data: allquestionArray,
      });
    } else {
      // user 가 admin 아닐 때
      const userInfo = await Users.findOne({
        id: id,
      });
      res
        .status(200)
        .json({ message: "send user question", data: userInfo.question });
    }
  } else {
    res.status(401).json({ message: "authorization error" });
  }
};
