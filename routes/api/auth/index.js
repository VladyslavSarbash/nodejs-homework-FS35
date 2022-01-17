const express = require("express");
const router = express.Router();
const { authValidation } = require("../../../midllewares");
const { auth } = require("../../../controllers");
const guard = require("../../../midllewares/guard");

router.post("/signup", authValidation.signup, auth.signupUser);
router.post("/login", authValidation.login, auth.loginUser);
router.post("/logout", guard, auth.logoutUser);

module.exports = router;
