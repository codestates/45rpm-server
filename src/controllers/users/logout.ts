import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
  res.status(200).json({ message: "logout" });
};
