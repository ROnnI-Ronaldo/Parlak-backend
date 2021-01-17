const { check, validationResult } = require("express-validator");

exports.userSignUpAuthValidation = [
  check("firstName").not().isEmpty().withMessage("Please enter first name"),
  check("lastName").not().isEmpty().withMessage("Please enter last name"),
  check("email")
    .isEmail()
    .not()
    .isEmpty()
    .withMessage("Please enter a valid email"),
  check("password").isLength({ min: 3 }).withMessage("Please enter a password"),
];

exports.userSignInAuthValidation = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password").not().isEmpty().withMessage("Please enter a password"),
];

exports.isValidUser = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }
  next();
};
