const Contact = require("../../schemas/contactSchema");

const removeContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;
  const contactIsRemoved = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  if (!contactIsRemoved) {
    res.status(404).json({ message: "Contact does not exist!" });
    return;
  }

  res.status(200).json({ message: "Contact deleted!" });
};

module.exports = removeContact;
