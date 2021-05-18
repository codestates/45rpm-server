import { Request, Response } from "express";

module.exports = async (req: Request, res: Response) => {

  console.log("리퀘 바디", req.body)
 
  //토큰 유효성 체크
  //  통과했다면 진행
  

  //정상 로그아웃
  res.clearCookie("authorization", { path : "/" } )

  res.status(200).json({ message: "Logout succeed" });
};
