const Question = require("../../models/collection/Question");

module.exports = async (req, res) => {
  try {
    const { admin } = req.body.userData;
    const { questionId, replytext } = req.body;
    if (admin === false) {
      res.status(401).json({ message: "You don't have access" });
    } else {
      // admin 일 때

      await Question.findByIdAndUpdate(questionId, {
        $set: { reply: replytext, replyCheck: true },
      });

      res.status(200).json({ message: "Register Reply" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};