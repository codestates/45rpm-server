const Question = require("../../models/collection/Question");
const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    const { questionId } = req.body;

    // 삭제 요청된 질문 삭제
    await Question.deleteOne({ _id: questionId });

    // 해당 질문을 한 사용자의 질문 목록 데이터에서 해당 질문을 삭제
    const currentUser = await Users.findOne({ id: req.body.userData.id });
    await currentUser.question.pull(questionId);
    currentUser.save();
    res.status(200).json({ message: "question deleted" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
