const fs = require("fs/promises");
const path = require("path");
const arrayContacts = path.resolve(__dirname, "contacts.json");
const { randomUUID } = require("crypto");

const getAllContacts = async () => {
  return await fs.readFile(arrayContacts).then((array) => JSON.parse(array));
};

const listContacts = async () => {
  const contacts = await getAllContacts();

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();

  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId
  );

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();

  const newArrayContacts = contacts.filter(
    (contact) => contact.id.toString() !== contactId
  );

  if (contacts.length === newArrayContacts.length) return false;

  fs.writeFile(
    __dirname + "/contacts.json",
    JSON.stringify(newArrayContacts, null, 2)
  );

  return true;
};

const addContact = async (body) => {
  const contacts = await getAllContacts();

  const newContact = { id: randomUUID(), ...body };

  contacts.push(newContact);

  fs.writeFile(__dirname + "/contacts.json", JSON.stringify(contacts, null, 2));
  return newContact;
};

const replacementContact = async (contactId, body) => {
  const contacts = await getAllContacts();

  const indexContact = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );

  if (indexContact === -1) return false;

  const updateContact = { id: contactId, ...body };
  contacts[indexContact] = updateContact;

  fs.writeFile(__dirname + "/contacts.json", JSON.stringify(contacts, null, 2));

  return true;
};

const updateContact = async (contactId, body) => {
  const contacts = await getAllContacts();

  const indexContact = contacts.findIndex(
    (contact) => contact.id.toString() === contactId
  );

  if (indexContact === -1) return false;

  const updateContact = { id: contactId, ...contacts[indexContact], ...body };
  contacts[indexContact] = updateContact;

  fs.writeFile(__dirname + "/contacts.json", JSON.stringify(contacts, null, 2));

  return true;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  replacementContact,
  updateContact,
};
