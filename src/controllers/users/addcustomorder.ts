import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom")

module.exports = async (req: Request, res: Response) => {
  try{
    console.log("리퀘 바디", req.body);
    const { address, orderPersonName, orderPrice, customId } = req.body;

    await Customs.findByIdAndUpdate(customId, {
      $set: { 
        order: { 
          address: address,
          orderPersonName:orderPersonName,
          orderPrice: orderPrice,
          orderState: false
        } 
      },
    });
    res.status(200).json({ message: "Your custom saved succeed" });


  } catch(err) {
    console.error(err)
  }
};
