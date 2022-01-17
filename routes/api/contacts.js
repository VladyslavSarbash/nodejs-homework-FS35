const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");
const { contactValidation } = require("../../midllewares");
const guard = require("../../midllewares/guard");

router.get(
  "/",
  [guard, contactValidation.queryValidate],
  contacts.listContacts
);

router.get(
  "/:contactId",
  [guard, contactValidation.queryValidate],
  contacts.getContactById
);

router.post(
  "/",
  [guard, contactValidation.addAndReplacementValidate],
  contacts.addContacts
);

router.delete("/:contactId", guard, contacts.removeContact);

router.put(
  "/:contactId",
  [guard, contactValidation.addAndReplacementValidate],
  contacts.replacementContact
);

router.patch(
  "/:contactId",
  [guard, contactValidation.updateValidate],
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  [guard, contactValidation.favoriteValidation],
  contacts.changeFavoriteStatus
);

module.exports = router;
