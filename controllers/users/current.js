const currentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    data: {
      email,
      subscription,
    },
  });
};

module.exports = currentUser;
