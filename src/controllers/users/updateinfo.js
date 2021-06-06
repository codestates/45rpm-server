const bcrypt = require("../controllermiddleware/bcrypt");

const Users = require("../../models/collection/User");

module.exports = async (req, res) => {
  try {
    console.log("리퀘 인자 확인", req.body);

    // 입력된 현재 비밀번호가 DB의 비밀번호와 일치하는지 확인
    const verified = await bcrypt.compare(
      req.body.oldpassword,
      req.body.userData.id,
    );

    if (!verified) {
      // 현재 비밀번호를 제대로 입력하지 못했을 시 정보 수정 불가
      res.status(401).json({ message: "Wrong password" });
    } else {
      // 현재 비밀번호를 제대로 입력한 경우 수정 가능
      const { id } = req.body.userData;
      const { username, email, newpassword } = req.body;

      const isSamePw = await bcrypt.compare(newpassword, id);
      const sameEmailCheck = await Users.findOne({ email: email });

      if (!isSamePw) {
        // 수정하려는 비밀번호와 원래 비밀번호가 같지 않을 때 (비밀번호 수정 가능)
        if (!sameEmailCheck || sameEmailCheck.id === id) {
          // 겹치는 이메일 없는 상태
          const currentUser = await Users.findOne({ id: id });
          await Users.findByIdAndUpdate(currentUser._id, {
            $set: {
              username: !username === true ? currentUser.username : username,
              email: !email === true ? currentUser.email : email,
              password:
                !newpassword === true
                  ? currentUser.password
                  : bcrypt.encrypt(newpassword),
            },
          });
          res.status(200).json({ message: "Update info" });
        } else {
          // 수정하려는 이메일을 이미 누군가 쓰고 있음
          res.status(403).json({ message: "This Email is already used" });
        }
      } else {
        // 수정하려는 비밀번호가 기존 비밀번호와 같음
        res.status(403).json({ message: "You already use this password" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
