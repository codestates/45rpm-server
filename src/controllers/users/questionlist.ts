import { Request, Response } from "express";
const Users = require("../../models/collection/User");

module.exports = async (req: Request, res: Response) => {
  res.status(200).json({ message: "questionlist" });
  /**
   * get questionlist
   *
   * admin === true, admin === false 일때를 나눠서
   * admin === true 이면 DB에 존재하는 모든 question을 가져오고
   * admin === false 이면 DB에 존재하는 question 중 나의 id와 일치하는 것들만 가져옴
   *
   * admin 판별 어디서? req.body.userData.admin
   *
   * 클라이언트에 admin 여부 보내줘야 할까? -> admin일 시 문의삭제 등 필요한 버튼 렌더링해야 할텐데
   */

  const { admin, id } = req.body.userData;

  if (admin === true) {
    // user 가 admin일때
    const allUserQuestions = await Users.find();
  } else {
    // user 가 admin 아닐 때
    const userInfo = await Users.findOne({
      id: id,
    });
    res
      .status(200)
      .json({ message: "send user question", data: userInfo.question });
  }
};
