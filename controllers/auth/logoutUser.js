const { setToken } = require("../../service/auth");

const logoutUser = async (req, res, next) => {
  await setToken(req.user.id, null);
  res.status(204).json({});
};

module.exports = logoutUser;
