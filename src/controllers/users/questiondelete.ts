import { Request, Response } from "express";
const Question = require("../../models/collection/Question");
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.body;
    await Question.deleteOne({ _id: questionId });
    const currentUser = await Users.findOne({ id: req.body.userData.id });
    await currentUser.question.pull(questionId);
    currentUser.save();
    res.status(200).json({ message: "question deleted" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
