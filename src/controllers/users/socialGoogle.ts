import { Request, Response } from "express";
const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
import { encrypt } from "../controllermiddleware/bcrypt";

module.exports = async (req: Request, res: Response) => {
  try{
    res.status(200).json({ message: "Google Login Succeed"});
  } catch(err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
}