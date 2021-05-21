import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom")

module.exports = async (req: Request, res: Response) => {
  try{
    console.log("리퀘 바디", req.body);
    const { id } = req.body.userData;
    const { address, customerName, price, customId } = req.body;

    await Customs.findByIdAndUpdate(customId, {
      $set: { 
        order: { 
          address: address,
          customerName:customerName,
          price: price
        } 
      },
    });
    res.status(200).json({ message: "Your custom saved succeed" });


  } catch(err) {
    console.error(err)
  }

  res.status(200).json({ message: "addcustomorder" });
};
