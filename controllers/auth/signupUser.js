const User = require("../../schemas/users");
const { EmailService, Sender } = require("../../service/email");

const signupUser = async (req, res, next) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  if (!!isExist) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const user = new User(req.body);
  const data = await user.save();
  const emailService = new EmailService(process.env.NODE_ENV, new Sender());
  const isSend = await emailService.sendVerifyEmail(
    email,
    user.verificationToken
  );

  res.status(201).json({
    user: {
      email: data.email,
      subscription: data.subscription,
      avatar: data.avatarURL,
      isSendEmailVerify: isSend,
    },
  });
};

module.exports = signupUser;
