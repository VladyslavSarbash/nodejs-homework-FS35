const Contact = require("../../schemas/contactSchema");

const replacementContact = async (req, res, next) => {
  const { id: userId } = req.user;

  const { contactId } = req.params;

  const contactIsReplaced = await Contact.findOneAndReplace(
    { _id: contactId, owner: userId },
    req.body,
    { new: true }
  );

  if (!contactIsReplaced) {
    res.status(404).json({ message: "Contact not found!" });
    return;
  }

  res.status(200).json({ message: "Contact replacement!" });
};

module.exports = replacementContact;
