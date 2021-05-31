const Question = require("../../models/collection/Question");

module.exports = async (req, res) => {
  try {
    const { id } = req.body.userData;
    const { questionId, title, contents } = req.body;

    //수정하려는 문의 도큐먼트를 찾고 값 변경
    const targetQuestion = await Question.findByIdAndUpdate(questionId, {
      title: title,
      contents: contents,
    });

    console.log("수정후 객체", targetQuestion);

    console.log("수정전 오브젝트 아이디", questionId);
    console.log("수정후 오브젝트 아이디", targetQuestion._id);

    res.status(200).json({ message: "Your question is successfully updated" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
