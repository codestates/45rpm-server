import { Request, Response } from "express";
const Customs = require("../../models/collection/Custom")

module.exports = async (req: Request, res: Response) => {
  try{
    console.log("리퀘 바디", req.body);
    const { admin } = req.body.userData;
      
    if (admin === false) {
      const { address, orderPersonName, orderPrice, customId } = req.body;
      
      const originalDoc = await Customs.findById(customId)

      await Customs.findByIdAndUpdate(customId, {
        $set: { 
          order: { 
            address: !address === true ? originalDoc.order.address : address ,
            orderPersonName:!orderPersonName === true ? originalDoc.order.orderPersonName : orderPersonName,
            orderPrice: !orderPrice === true ? originalDoc.order.orderPrice : orderPrice
          } 
        },
      });
    res.status(200).json({ message: "Your order is successfully changed" });
    } else {
      const { address, orderPersonName, orderPrice, customId, orderState } = req.body;
      
      const originalDoc = await Customs.findById(customId)
      
      console.log("처리값", !address)
      console.log("기본값", originalDoc.order)


      await Customs.findByIdAndUpdate(customId, {
        $set: { 
          order: { 
            address: !address === true ? originalDoc.order.address : address ,
            orderPersonName:!orderPersonName === true ? originalDoc.order.orderPersonName : orderPersonName,
            orderPrice: !orderPrice === true ? originalDoc.order.orderPrice : orderPrice,
            orderState: !orderState === true ? originalDoc.order.orderState : orderState
          } 
        },
      });

      res.status(200).json({message: "Updating user's order is successfully done by Admin"})

    }

  }catch(err) {
    console.error(err)
  }
};
