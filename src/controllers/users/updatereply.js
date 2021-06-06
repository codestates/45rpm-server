const Question = require("../../models/collection/Question");

module.exports = async (req, res) => {
  try {
    const { admin } = req.body.userData;
    const { questionId, replytext } = req.body;
    if (admin === false) {
      // admin 아닐 시 문의에 답변 작성 불가
      res.status(401).json({ message: "You don't have access" });
    } else {
      // admin 일 때

      await Question.findByIdAndUpdate(questionId, {
        $set: { reply: replytext, replyCheck: true },
      });

      res.status(200).json({ message: "Update Reply" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};
