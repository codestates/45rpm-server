import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom");

module.exports = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "shared" });
  try {
    const sharedCustom = await Customs.find({ share: true });

    console.log(sharedCustom);

    res.status(200).json({ message: "all shared custom", data: sharedCustom });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
