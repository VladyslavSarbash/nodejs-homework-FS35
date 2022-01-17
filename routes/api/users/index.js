const express = require("express");
const router = express.Router();
const { users } = require("../../../controllers");
const guard = require("../../../midllewares/guard");
const { usersValidation } = require("../../../midllewares/validation");

router.get("/current", guard, users.currentUser);
router.patch(
  "/",
  [guard, usersValidation.changeSubValidation],
  users.changeSubscription
);

module.exports = router;
