const express = require("express");
const router = express.Router();
const {
  adminSignIn,
  adminSignUp,
  signOut,
} = require("../../controller/admin/auth");
const {
  userSignUpAuthValidation,
  userSignInAuthValidation,
  isValidUser,
} = require("../../validation/auth");

const { requireSignIn } = require("../../middlewares/auth");

router.post(
  "/admin/signin",
  userSignInAuthValidation,
  isValidUser,
  adminSignIn
);
router.post(
  "/admin/signup",
  userSignUpAuthValidation,
  isValidUser,
  adminSignUp
);

router.post("/admin/signout", requireSignIn, signOut);

module.exports = router; 
