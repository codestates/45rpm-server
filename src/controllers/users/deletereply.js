const Question = require("../../models/collection/Question");

module.exports = async (req, res) => {
  try {
    const { admin } = req.body.userData;
    const { questionId } = req.body;

    if (admin === false) {
      // admin 아닐 시 401 상태코드 반환
      res.status(401).json({ message: "You don't have access" });
    } else {
      // admin 일 때 해당 문의의 답변 삭제
      await Question.findByIdAndUpdate(questionId, { reply: null });
      res.status(200).json({ message: "Reply is deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
