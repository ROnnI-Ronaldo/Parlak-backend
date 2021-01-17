const express = require("express");
const router = express.Router();
const { createProducts } = require("../controller/products");
const { requireSignIn, adminSignIn } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");
const shortId = require("shortid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortId.generate()}-${file.originalname}`);
  },
});

var upload = multer({ storage });

router.post(
  "/products/createProducts",
  requireSignIn,
  adminSignIn,
  upload.array("productPictures"),
  createProducts
);

module.exports = router;
