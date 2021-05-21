import { Request, Response } from "express";
const Question = require("../../models/collection/Question");

module.exports = async (req: Request, res: Response) => {
  try {
    const { admin } = req.body.userData;
    const { questionId, replytext } = req.body;
    if (admin === false) {
      res.status(401).json({ message: "You don't have access" });
    } else {
      // admin 일 때

      const reply = { replyText: replytext };

      await Question.findByIdAndUpdate(questionId, {
        $set: { reply: reply, replyCheck: true },
      });

      res.status(200).json({ message: "Register Reply" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
