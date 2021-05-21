import { Request, Response } from "express";
const Question = require("../../models/collection/Question");

module.exports = async (req: Request, res: Response) => {
  try {
    const { questionId } = req.body;
    await Question.deleteOne({ _id: questionId });
    res.status(200).json({ message: "question deleted" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
