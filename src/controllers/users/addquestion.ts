import { Request, Response } from "express";
const users = require("../../models/collection/user");

module.exports = async (req: Request, res: Response) => {
  try{
    const {id} = req.body.userData
    const {category, title, contents} = req.body

    await users.update({id: id}, {$push: {category, title, contents}})


    res.status(200).json({ message: "addquestion" });

  } catch(err) {
    console.error(err)
  }
};
