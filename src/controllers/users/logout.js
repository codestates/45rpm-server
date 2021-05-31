module.exports = (req, res) => {
  try {
    // console.log("리퀘 바디", req.body)

    //토큰 유효성 체크
    //  통과했다면 진행
    //실제 서비스의 경우에는 로그아웃 시, 사용했던 토큰을 blacklist라는 DB 테이블에 넣어 해당 토큰의 접근을 막는 작업을 해주어야 한다

    //정상 로그아웃

    res
      .clearCookie("authorization", {
        path: "/",
        domain: process.env.DOMAIN,
      })
      .status(200)
      .json({ message: "Logout succeed" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
