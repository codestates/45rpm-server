const Customs = require("../../models/collection/Custom");

module.exports = async (req, res) => {
  try {
    const customId = req.body.data;

    const originalDoc = await Customs.findById(customId);
    console.log("기존 커스텀", originalDoc);

    await Customs.findByIdAndUpdate(customId, { share: !originalDoc.share });

    res.status(200).json({
      message: `Your sharing state is successfully changed to ${!originalDoc.share}`,
    });
  } catch (err) {
    console.error(err);
  }
};
