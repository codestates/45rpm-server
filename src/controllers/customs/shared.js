const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    // 최신 데이터부터 제공하기 위한 역 sort
    const sharedCustom = await Customs.find({ share: true })
      .sort({
        field: "desc",
        _id: -1,
      })
      .limit(9);

    res.status(200).json({ message: "all shared custom", data: sharedCustom });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
