import { Request, Response } from "express";
const users = require("../../models/collection/user");

module.exports = async (req: Request, res: Response) => {
  try {
    const decodedData = req.body.userData;
    const user = await users.findOneAndDelete({ id: decodedData.id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      res.clearCookie("authorization", { path: "/" });
      res.status(200).json({
        message: "withdrawal done",
      });
      console.log("탈퇴 완료");
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
