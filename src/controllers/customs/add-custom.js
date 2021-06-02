const Customs = require("../../models/collection/Custom");
const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    const files = req.files;

    const { id } = req.body.userData;
    const { color, title, songList } = req.body;
    const albumPic = files.albumPic[0];
    const recordPic = files.recordPic[0];

    console.log(albumPic);
    console.log(recordPic);
    console.log(">>>>songlist", songList);
    const song = songList.split(",");
    console.log("<>>>song", song);

    const newCustom = await Customs.create({
      userId: id,
      color: color,
      title: title,
      songList: song,
      albumPic: albumPic.filename,
      recordPic: recordPic.filename,
      share: false,
      order: null,
    });

    newCustom.save();

    const userDocument = await Users.findOne({ id: id });

    userDocument.customizeSet.push(String(newCustom._id));

    userDocument.save();

    res.status(200).json({ message: "new customize" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};