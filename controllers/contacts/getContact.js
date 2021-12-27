const Contact = require("../../schemas/contactSchema");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findOne({ _id: contactId });

  if (!contact) {
    res.status(404).json({ message: "Contact not found!" });
    return;
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
