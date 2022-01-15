const User = require("../../schemas/users");

const signupUser = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (!!isExist) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const user = new User(req.body);
  const data = await user.save();

  res.status(201).json({
    user: {
      email: data.email,
      subscription: data.subscription,
    },
  });
};

module.exports = signupUser;
