const Contact = require("../../schemas/contactSchema");

const getContactById = async (req, res, next) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email subscription",
  });

  if (!contact) {
    res.status(404).json({ message: "Contact not found!" });
    return;
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
