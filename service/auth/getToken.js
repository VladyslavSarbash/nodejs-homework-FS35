const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const getToken = (user) => {
  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  return token;
};

module.exports = getToken;
