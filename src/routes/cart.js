const express = require("express");
const { addToCart } = require("../controller/cart");
const { requireSignIn, userSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/cart/add-to-cart", requireSignIn, userSignIn, addToCart);

module.exports = router;
