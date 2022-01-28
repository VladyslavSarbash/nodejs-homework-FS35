const express = require("express");
const router = express.Router();
const { users } = require("../../../controllers");
const guard = require("../../../midllewares/guard");
const { upload } = require("../../../midllewares/upload");
const {
  usersValidation,
  authValidation,
} = require("../../../midllewares/validation");

router.get("/current", guard, users.currentUser);
router.get("/verify/:verificationToken", users.verifyUser.verifyUser);
router.post(
  "/verify",
  authValidation.verify,
  users.verifyUser.repeatEmailForVerifyUser
);
router.patch(
  "/",
  [guard, usersValidation.changeSubValidation],
  users.changeSubscription
);
router.patch("/avatars", guard, upload.single("avatar"), users.uploadAvatar);

module.exports = router;
