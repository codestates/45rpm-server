const Question = require("../../models/collection/Question");

module.exports = async (req, res) => {
  try {
    const { admin, id } = req.body.userData;
    if (admin === true) {
      // user 가 admin일때
      const allUserQuestions = await Question.find().sort({
        field: "desc",
        _id: -1,
      });
      res.status(200).json({
        message: "questions of all users",
        data: allUserQuestions,
      });
    } else {
      // user 가 admin 아닐 때
      const currentUserQuestion = await Question.find({ userId: id }).sort({
        field: "desc",
        _id: -1,
      });
      res.status(200).json({
        message: "send user question",
        data: currentUserQuestion,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
