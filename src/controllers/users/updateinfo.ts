import { Request, Response } from "express";
import { encrypt, compare } from "../controllermiddleware/bcrypt";
const users = require("../../models/collection/user");

module.exports = async (req: Request, res: Response) => {
  if (!req.body.userData) {
    res.status(401).json({ message: "Wrong Authorization" });
  } else {
    const verified = await compare(req.body.oldpassword, req.body.userData.id);

    if (!verified) {
      res.status(401).json({ message: "Wrong password" });
    } else {
      const sameEmailCheck = await users.findOne({ email: req.body.email });

      const requestUsername = req.body.username;
      const requestEmail = req.body.email;
      const requestPw = req.body.newpassword;

      const isSamePw = await compare(
        req.body.newpassword,
        req.body.userData.id,
      );

      if (!isSamePw) {
        // oldPw !== newPw
        if (!sameEmailCheck) {
          // 겹치는 이메일 없는 상태

          const currentUser = await users.findOne({ id: req.body.userData.id });

          let changeUsername;
          let changeEmail;
          let changePw;

          if (!requestUsername) {
            changeUsername = currentUser.username;
          } else {
            changeUsername = requestUsername;
          }

          if (!requestEmail) {
            changeEmail = currentUser.email;
          } else {
            changeEmail = requestEmail;
          }

          if (!requestPw) {
            changePw = currentUser.password;
          } else {
            changePw = encrypt(requestPw);
          }
          console.log(changeUsername, changeEmail, changePw);

          await users.update(
            { id: req.body.userData.id },
            {
              username: changeUsername,
              email: changeEmail,
              password: changePw,
            },
          );

          res.status(200).json({ message: "Update info" });
        } else {
          if (sameEmailCheck.id === req.body.userData.id) {
            res.status(403).json({ message: "This is your Origin Email" });
          } else {
            res.status(403).json({ message: "This Email is already used" });
          }
        }
      } else {
        res.status(403).json({ message: "You already use this password" });
      }
    }
  }
};
