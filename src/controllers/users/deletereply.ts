import { Request, Response } from "express";
const Question = require("../../models/collection/Question");

module.exports = async (req: Request, res: Response) => {
  try {
    const {admin} = req.body.userData
    const {questionId} = req.body

    if(admin === false) {
      res.status(401).json({ message: "You don't have access" });
    }
    else {
      // admin 일 때
      await Question.findByIdAndUpdate( questionId, { reply: null })
      res.status(200).json({ message: "Reply is deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
