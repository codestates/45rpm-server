import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  if (req.body.userData) {
    const { id } = req.body.userData;
    const { questionId, title, contents } = req.body;

    //유저 도큐먼트를 먼저 찾음
    const userDocument = await Users.findOne({ id: id });

    console.log("찾은 유저", userDocument);

    //원하는 서브 도큐먼트를 필터링 해서 찾음
    const targetQuestion = userDocument.question.filter((question: any) => {
      return question._id.toString() === questionId;
    })[0];

    console.log("찾은 객체", targetQuestion);

    userDocument.question.pull(targetQuestion._id);

    await userDocument.save();

    res.status(200).json({ message: "question deleted" });
  } else {
    res.status(401).json({ message: "authorization error" });
  }
};
