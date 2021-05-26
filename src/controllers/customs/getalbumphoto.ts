import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom");
const path = require("path");

module.exports = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.userData;
    const myCustoms = await Customs.find({ userId: id });
    res.status(200).sendFile("public/index.html", {
      root: path.join(myCustoms[0].albumPic),
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
