import { Request, Response } from "express";
const Custom = require("../../models/collection/Custom");
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const { id } = req.body.userData;
    const { color, title, songList } = req.body;
    const albumPic = files.albumPic[0];
    const recordPic = files.recordPic[0];

    const newCustom = await Custom.create({
      userId: id,
      color: color,
      title: title,
      songList: songList,
      albumPic: albumPic.path,
      recordPic: recordPic.path,
      share: false,
      order: null,
    });

    newCustom.save();

    const userDocument = await Users.findOne({ id: id });
    console.log(id);
    console.log(userDocument);

    userDocument.customizeSet.push(String(newCustom._id));

    userDocument.save();

    res.status(200).json({ message: "new customize" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
