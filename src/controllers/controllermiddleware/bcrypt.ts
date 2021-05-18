import { NextFunction, Request, Response } from "express"
const users = require("../../models/collection/user");

//bcrypt에 대한 처리만
const bcrypt = require("bcrypt")
 
const encrypt = async (password : String) => {
      return await bcrypt.hashSync(password, 10)
  }

const compare = async (password : String, id: String) => {
    const userInfo = await users.findOne({
        id: id
      })
    return await bcrypt.compare(password, userInfo.password)
  }


export {encrypt, compare}
module.exports ={ encrypt, compare}