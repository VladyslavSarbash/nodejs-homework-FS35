const User = require("../../schemas/users");

const changeSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id, subscription: subscriptionUser } = req.user;

  if (subscription === subscriptionUser) {
    res
      .status(409)
      .json({ message: `Subscription ${subscription} already activated!` });
    return;
  }

  const newUser = await User.findOneAndUpdate({ _id }, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Success! Your subscription has been change!" });
};

module.exports = changeSubscription;
