const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controller/auth");
const {
  userSignUpAuthValidation,
  userSignInAuthValidation,
  isValidUser,
} = require("../validation/auth");

router.post("/signin", userSignInAuthValidation, isValidUser, signIn);
router.post("/signup", userSignUpAuthValidation, isValidUser, signUp);

module.exports = router;
