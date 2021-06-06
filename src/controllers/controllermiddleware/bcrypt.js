const Users = require("../../models/collection/User");

//bcrypt에 대한 처리만
const bcrypt = require("bcrypt");

module.exports = {
  // 암호화
  encrypt: (password) => {
    return bcrypt.hashSync(password, 10);
  },

  // 복호화 (단방향, 단순 비교만 가능)
  compare: async (password, id) => {
    console.log("비번 인자 확인", password);
    console.log("아이디 인자 확인", id);
    const userInfo = await Users.findOne({
      id: id,
    });
    return bcrypt.compare(password, userInfo.password);
  },
};
