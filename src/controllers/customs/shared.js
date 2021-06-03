const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    // console.log("응답", req.query);
    let count = req.data.count;
    let skip = count * 6;
    console.log("카운트", count);
    console.log("스킵", skip);
    const sharedCustom = await Customs.find({ share: true })
      .skip(skip)
      .limit(6);

    res
      .status(200)
      .json({ message: "all shared custom", data: sharedCustom, count: count });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
