const Customs = require("../../models/collection/Custom");
const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    // formData로 넘어온 사진 파일들
    const files = req.files;

    const { id } = req.body.userData;
    const { color, title, songList } = req.body;
    const albumPic = files.albumPic[0];
    const recordPic = files.recordPic[0];

    console.log("앨범 커버", albumPic);
    console.log("센터 커버", recordPic);
    console.log(">>>>songlist", songList);
    const song = songList.split(",");
    console.log("<>>>song", song);

    // 들어온 데이터를 기반으로 새로운 커스텀 모델 생성
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

    // 커스텀 저장
    newCustom.save();

    // 유저의 커스텀 목록에 새로 만든 커스텀 아이디 저장
    const userDocument = await Users.findOne({ id: id });
    userDocument.customizeSet.push(String(newCustom._id));
    userDocument.save();

    res.status(200).json({ message: "new customize" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
