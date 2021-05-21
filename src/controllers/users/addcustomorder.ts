import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
  try{
    console.log("리퀘 바디", req.body);
    const { id } = req.body.userData;
    const { userId, address, customerName, price, customId } = req.body;

  } catch(err) {
    console.error(err)
  }

  res.status(200).json({ message: "addcustomorder" });
};
