import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try{
    const {id} = req.body.userData
    const {questionId, category, title, contents} = req.body

    const userDocument = await Users.find({id: id})

    const updating = await userDocument.findById({questionId})

    console.log("찾은 객체", updating)
    // await Users.findByIdAndUpdate(
    //   questionId, 
    //   {category, title, contents}
    //   )


    res.status(200).json({ message: "Your question is successfully updated" });

  } catch(err) {
    console.error(err)
  }
};
