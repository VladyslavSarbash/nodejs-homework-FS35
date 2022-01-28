const User = require("../../schemas/users");
const { getToken, setToken } = require("../../service/auth");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isValidPassword = await user?.isValidPassword(password);

  if (!user?.verify) {
    res.status(401).json({ message: "Confirm your email" });
    return;
  }

  if (!user || !isValidPassword) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
  const token = getToken(user);
  await setToken(user.id, token);

  res.status(201).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = loginUser;
