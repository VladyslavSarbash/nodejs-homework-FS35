const User = require("../../schemas/users");
const { EmailService, Sender } = require("../../service/email");

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.verificationToken;
  const userFromToken = await User.findOne({ verificationToken: verifyToken });

  if (userFromToken) {
    await User.updateOne(
      { _id: userFromToken.id },
      { verify: true, verificationToken: null }
    );

    res.status(201).json({ message: "Verification successful!" });
    return;
  }
  res.status(404).json({ message: "User not found!" });
};

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const { email, verificationToken } = user;
    const emailService = new EmailService(process.env.NODE_ENV, new Sender());

    const isSend = await emailService.sendVerifyEmail(email, verificationToken);

    if (user.verify) {
      res
        .status(400)
        .json({ message: "Verification has already been passed!" });
      return;
    }

    if (!isSend) {
      res.status(422).json({ message: "Error! Email does not send!" });
      return;
    }

    res.status(201).json({ message: "Verification email sent!" });
    return;
  }

  res.status(404).json({ message: "User not found!" });
};

module.exports = { verifyUser, repeatEmailForVerifyUser };
