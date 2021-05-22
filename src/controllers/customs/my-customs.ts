import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom");

module.exports = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.userData;
    const myCustoms = await Customs.find({ userId: id });
    res.status(200).json({ message: "show my all Customs", data: myCustoms });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
