const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContacts,
  removeContact,
  replacementContact,
  updateContact,
  changeFavoriteStatus,
} = require("../../controllers");
const { contactValidation } = require("../../midllewares");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation.addAndReplacementValidate, addContacts);

router.delete("/:contactId", removeContact);

router.put(
  "/:contactId",
  contactValidation.addAndReplacementValidate,
  replacementContact
);

router.patch("/:contactId", contactValidation.updateValidate, updateContact);

router.patch(
  "/:contactId/favorite",
  contactValidation.favoriteValidation,
  changeFavoriteStatus
);

module.exports = router;
