const User = require("../../schemas/users");

const setToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

module.exports = setToken;
