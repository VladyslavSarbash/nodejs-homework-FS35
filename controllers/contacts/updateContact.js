const Contact = require("../../schemas/contactSchema");

const updateContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;

  const contactIsUpdated = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    req.body,
    { new: true }
  );

  if (!contactIsUpdated) {
    res.status(404).json({ message: "Contact not found!" });
    return;
  }

  res.status(200).json({ message: "Contact updated!" });
};
module.exports = updateContact;
