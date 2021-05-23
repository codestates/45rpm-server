const Users = require("../../models/collection/User");

//bcrypt에 대한 처리만
const bcrypt = require("bcrypt");

const encrypt = (password: String) => {
  return bcrypt.hashSync(password, 10);
};

const compare = async (password: String, id: String) => {
  console.log("비번 인자 확인", password)
  console.log("아이디 인자 확인", id)
  const userInfo = await Users.findOne({
    id: id,
  });
  return bcrypt.compare(password, userInfo.password);
};

export { encrypt, compare };
