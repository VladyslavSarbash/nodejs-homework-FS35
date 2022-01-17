const Contact = require("../../schemas/contactSchema");

const changeFavoriteStatus = async (req, res, next) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;
  const statusIsChange = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    req.body,
    { new: true }
  );

  if (!statusIsChange) {
    res.status(404).json({ message: "Contact not found!" });
  }

  res.status(200).json(statusIsChange);
};

module.exports = changeFavoriteStatus;
