import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try {
    const { admin } = req.body.userData;
    const { questionId, replytext } = req.body;
    if (admin === false) {
      res.status(401).json({ message: "You don't have access" });
    } else {
      // admin 일 때
      const allQuestion = await Users.find();

      for (let i = 0; i < allQuestion.length; i++) {
        for (let k = 0; k < allQuestion[i].question.length; k++) {
          if (String(allQuestion[i].question[k]._id) === questionId) {
            const askUser = await Users.findOne({ id: allQuestion[i].id });
            askUser.question[k].reply = { replyText: replytext };
            askUser.question[k].replyCheck = true;
            await askUser.save();
          }
        }
      }

      res.status(200).json({ message: "Register Reply" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
