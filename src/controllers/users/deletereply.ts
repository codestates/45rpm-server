import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {
  try {
    const {admin} = req.body.userData
    const {questionId} = req.body

    if(admin === false) {
      res.status(401).json({ message: "You don't have access" });
    }
    else {
      
    }




    res.status(200).json({ message: "deletereply" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
