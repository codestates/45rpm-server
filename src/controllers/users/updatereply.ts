import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "updatereply" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
