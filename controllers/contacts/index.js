const listContacts = require("./listContacts");
const getContactById = require("./getContact");
const addContacts = require("./addContact");
const removeContact = require("./removeContact");
const replacementContact = require("./replacementContact");
const updateContact = require("./updateContact");
const changeFavoriteStatus = require("./favoriteContact");

module.exports = {
  listContacts,
  replacementContact,
  getContactById,
  addContacts,
  removeContact,
  updateContact,
  changeFavoriteStatus,
};
