import { Request, Response } from "express";
const Users = require("../../models/collection/User");
const Question = require("../../models/collection/Question")

module.exports = async (req: Request, res: Response) => {
  try {
    console.log("리퀘 바디", req.body);
    const { id } = req.body.userData;
    const { category, title, contents } = req.body;

    
    //새로운 문의 도큐먼트 생성
    const newQuestion = await Question.create({
      userId: id,
      category,
      title,
      contents,
      reply: null,
      replyCheck: false,
    });

    console.log("새로 생긴 문의", newQuestion);
    
    //여기까지 컬렉션에 문의 저장 완료
    newQuestion.save()


    //문의를 집어넣을 유저의 도큐먼트를 먼저 가져옴
    const userDocument = await Users.findOne({ id: id });

    console.log("기존 유저 정보", userDocument);
    
    console.log("오브젝트 아이디", newQuestion._id)
    
    //새로 생긴 문의 도큐먼트를 DB에서 가져온 유저 도큐먼트에 push처리
    userDocument.question.push(String(newQuestion._id))
    
    //처리된 내용을 저★장★
    userDocument.save()

    res.status(201).json({ message: "Your question is successfully uploaded" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
