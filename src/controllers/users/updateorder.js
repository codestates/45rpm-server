const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    console.log("리퀘 바디", req.body);
    const { admin } = req.body.userData;

    if (admin === false) {
      // admin 아닐 시
      const { address, orderPersonName, orderPrice, customId } = req.body;

      const originalDoc = await Customs.findById(customId);

      // 주문 수정
      await Customs.findByIdAndUpdate(customId, {
        $set: {
          order: {
            address: !address === true ? originalDoc.order.address : address,
            orderPersonName:
              !orderPersonName === true
                ? originalDoc.order.orderPersonName
                : orderPersonName,
            orderPrice:
              !orderPrice === true ? originalDoc.order.orderPrice : orderPrice,
          },
        },
      });
      res.status(200).json({ message: "Your order is successfully changed" });
    } else {
      // admin일 시 주문 상태 수정 가능
      const { address, orderPersonName, orderPrice, customId, orderState } =
        req.body;

      const originalDoc = await Customs.findById(customId);

      console.log("처리값", !address);
      console.log("기본값", originalDoc.order);

      await Customs.findByIdAndUpdate(customId, {
        $set: {
          order: {
            address: !address === true ? originalDoc.order.address : address,
            orderPersonName:
              !orderPersonName === true
                ? originalDoc.order.orderPersonName
                : orderPersonName,
            orderPrice:
              !orderPrice === true ? originalDoc.order.orderPrice : orderPrice,
            orderState:
              !orderState === true ? originalDoc.order.orderState : orderState,
          },
        },
      });

      res.status(200).json({
        message: "Updating user's order is successfully done by Admin",
      });
    }
  } catch (err) {
    console.error(err);
  }
};
