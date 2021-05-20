import { Request, Response } from "express";
const mongoose = require("mongoose");
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try {
    console.log("리퀘 바디", req.body);
    const { id } = req.body.userData;
    const { category, title, contents } = req.body;

    //문의를 집어넣을 유저의 도큐먼트를 먼저 가져옴
    const userDocument = await Users.findOne({ id: id });

    console.log("기존 유저 정보", userDocument);

    //빈 도큐먼트를 만들어 그 안에 서브 도큐먼트 생성
    const newUserDoc = new Users();
    const newQuestion = await newUserDoc.question.create({
      category,
      title,
      contents,
      reply: null,
      replyCheck: false,
    });

    console.log("새로 생긴 문의", newQuestion);

    //새로 생긴 서브 도큐먼트를 DB에서 가져온 유저 도큐먼트에 push처리
    userDocument.question.push(newQuestion);

    //처리된 내용을 저★장★
    await userDocument.save();

    console.log("문의 작성 완료 체크", userDocument);

    res.status(201).json({ message: "Your question is successfully uploaded" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
