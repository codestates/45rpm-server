const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    const sharedCustom = await Customs.find({ share: true });

    res.status(200).json({ message: "all shared custom", data: sharedCustom });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err });
  }
};
