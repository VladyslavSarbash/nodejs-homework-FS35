const Contact = require("../../schemas/contactSchema");

const addContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: userId });
  res.status(201).json(newContact);
};

module.exports = addContact;
