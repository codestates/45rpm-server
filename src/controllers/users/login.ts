import { Request, Response } from "express";
const users = require("../../models/collection/user");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
import {encrypt, compare} from "../controllermiddleware/bcrypt"

module.exports = async (req: Request, res: Response) => {
  const {id, password} = req.body
  
  //유저 정보 가져오기
  const userInfo = await users.findOne({
    id: id
  })

  // console.log(userInfo)
  
  if(!userInfo) {
    res.status(403).json({message: "There is no user information"})
  }  
  else {
    //패스워드 비교하기
    const verified = compare(password, id)
    if(!verified) {
      res.status(401).json({message: "You wrote wrong password"})
    }
    else {
      const {id, username, email, admin, social} = userInfo
      
      const payload = {
        id, username, email, admin, social
      }

      //만료 기간은 추후 수정 예정
      const token = jwt.sign(payload, process.env.SALT, {expiresIn: "1d"})

      //클라이언트와 이야기해보기
      res.cookie("authorization", token)


      res.status(200).json({message: "Login Succeed", data : payload})
    }
  }

};
