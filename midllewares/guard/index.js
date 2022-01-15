const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const User = require("../../schemas/users");

const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, SECRET_KEY);
    return !!verify;
  } catch (error) {
    return false;
  }
};

const guard = async (req, res, next) => {
  const token = req.get("authorization")?.split(" ")[1];
  const isValid = verifyToken(token);

  if (!isValid) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const payload = jwt.decode(token);
  const user = await User.findById(payload.id);

  if (!user || user.token !== token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.user = user; //res.locals.user = user

  next();
};

module.exports = guard;
