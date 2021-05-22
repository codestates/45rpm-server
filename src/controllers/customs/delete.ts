import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom");
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try{
    const {customId} = req.body;
    
    const targetCustom = await Customs.findByIdAndRemove(customId);
    
    console.log("삭제 확인", targetCustom);

    const userDoc = await Users.findOne({id: targetCustom.userId})

    console.log("유저 정보", userDoc)

    userDoc.customizeSet.pull(customId)
    userDoc.save()

    res.status(200).json({ message: "Your custom is successfully deleted" });
  } catch(err) {
    console.error(err)
  }
};
