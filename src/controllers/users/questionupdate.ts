import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try{
    const {id} = req.body.userData
    const {questionId, category, title, contents} = req.body

    // const questionDocument = await Users.findOne({id: id}, (err:any, user:any) =>{
    //   const targetQuestion = user.question.filter((question:any) => {
    //     return question._id === questionId
    //   }).pop();
    // })

    const userDocument = await Users.findOne({id: id})


    console.log("찾은 유저", userDocument)
    const targetQuestion = userDocument.question.filter((question:any) => {
      return question._id.toString() === questionId
    })[0]
    console.log("찾은 객체", targetQuestion)

    targetQuestion.category = category
    targetQuestion.title = title
    targetQuestion.contents = contents

    console.log("수정후 객체", targetQuestion)


    res.status(200).json({ message: "Your question is successfully updated" });

  } catch(err) {
    console.error(err)
  }
};
