import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try{
    const {id} = req.body.userData
    const {questionId, category, title, contents} = req.body

    //유저 도큐먼트를 먼저 찾음
    const userDocument = await Users.findOne({id: id})

    console.log("찾은 유저", userDocument)

    //원하는 서브 도큐먼트를 필터링 해서 찾음
    const targetQuestion = userDocument.question.filter((question:any) => {
      return question._id.toString() === questionId
    })[0]

    console.log("찾은 객체", targetQuestion)
    
    //서브 도큐먼트의 인덱스도 찾음
    const targetQuestionIdx = userDocument.question.indexOf(targetQuestion)
    console.log("찾은 객체 인덱스값", targetQuestionIdx)

    //인덱스를 바탕으로 값 수정(ObjectId는 변경됨)
    userDocument.question.set(targetQuestionIdx, {
      category: category,
      title: title,
      contents: contents
    })

    console.log("수정후 객체", userDocument.question[targetQuestionIdx])

    userDocument.save()
    console.log("문의 수정 완료!")

    res.status(200).json({ message: "Your question is successfully updated" });

  } catch(err) {
    console.error(err)
    res.status(401).json({ message: err });
  }
};
