const Contact = require("../../schemas/contactSchema");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Contacts not found!" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = listContacts;
