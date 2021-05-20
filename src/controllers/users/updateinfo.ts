import { Request, Response } from "express";
import { encrypt, compare } from "../controllermiddleware/bcrypt";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
try{

  
    if (!req.body.userData) {
      // 인증이 완료되지 않았을 때
      res.status(401).json({ message: "Wrong Authorization" });
    } else {
      const verified = await compare(req.body.oldpassword, req.body.userData.id);
      if (!verified) {
        res.status(401).json({ message: "Wrong password" });
      } else {
        const sameEmailCheck = await Users.findOne({ email: req.body.email });
  
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
            const currentUser = await Users.findOne({ id: req.body.userData.id });
  
            let changeUsername; // 바꿀 닉네임
            let changeEmail; // 바꿀 이메일
            let changePw; // 바꿀 패스워드
  
            if (!requestUsername) {
              // 바꿀 닉네임 입력 X
              changeUsername = currentUser.username;
            } else {
              // 바꿀 닉네임 입력
              changeUsername = requestUsername;
            }
            if (!requestEmail) {
              // 바꿀 이메일 입력 X
              changeEmail = currentUser.email;
            } else {
              // 바꿀 이메일 입력
              changeEmail = requestEmail;
            }
            if (!requestPw) {
              // 바꿀 패스워드 있을 때
              changePw = currentUser.password;
            } else {
              // 바꿀 패스워드 입력
              changePw = encrypt(requestPw);
            }
            await Users.update(
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
              // 수정하려는 이메일이 기존 이메일과 같음
              res.status(403).json({ message: "This is your Origin Email" });
            } else {
              // 수정하려는 이메일을 이미 누군가 쓰고 있음
              res.status(403).json({ message: "This Email is already used" });
            }
          }
        } else {
          // 수정하려는 비밀번호가 기존 비밀번호와 같음
          res.status(403).json({ message: "You already use this password" });
        }
      }
    }
} catch(err) {
  console.error(err)
    res.status(401).json({ message: err });
}
};
