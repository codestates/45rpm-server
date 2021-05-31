const Users = require("../../models/collection/User");
const jwt = require("jsonwebtoken");
const compare = require("../controllermiddleware/bcrypt");

module.exports = async (req, res) => {
  console.log("body?????????????", req.body);

  if (!req.body.id) {
    return res.status(400).end();
  }
  const id = req.body.id;
  try {
    const data = await Users.findOne({ id: id });
    if (!data) {
      return res.json({ data: null, message: "no exist" });
    }

    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
      admin: data.admin,
      social: data.social,
    };

    const token = jwt.sign(payload, process.env.SALT, { expiresIn: "1d" });

    res.cookie("authorization", token, {
      path: "/",
      domain: process.env.DOMAIN,
    });

    res.status(200).json({ message: "Check Succeed", data: payload });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: err });
  }
};
