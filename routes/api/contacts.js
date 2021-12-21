const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  replacementContact,
  updateContact,
} = require("../../model");
const validation = require("./validation");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: "Contact not found!" });
    return;
  }
  res.status(200).json(contact);
});

router.post(
  "/",
  validation.addAndReplacementValidate,
  async (req, res, next) => {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
);

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await removeContact(contactId);

  if (!contacts) {
    res.status(404).json({ message: "Contact does not exist!" });
    return;
  }

  res.status(200).json({ message: "Contact deleted!" });
});

router.put(
  "/:contactId",
  validation.addAndReplacementValidate,
  async (req, res, next) => {
    const { contactId } = req.params;

    const contactReplaced = await replacementContact(contactId, req.body);

    if (!contactReplaced) {
      res.status(404).json({ message: "Contact not found!" });
      return;
    }

    res.status(200).json({ message: "Contact replacement!" });
  }
);

router.patch(
  "/:contactId",
  validation.updateValidate,
  async (req, res, next) => {
    const { contactId } = req.params;

    const contactUpdated = await updateContact(contactId, req.body);

    if (!contactUpdated) {
      res.status(404).json({ message: "Contact not found!" });
      return;
    }

    res.status(200).json({ message: "Contact updated!" });
  }
);

module.exports = router;
