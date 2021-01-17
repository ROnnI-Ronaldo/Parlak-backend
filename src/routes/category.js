const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controller/category");
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
  "/category/create",
  requireSignIn,
  adminSignIn,
  upload.single("categoryImage"),
  createCategory
);
router.get("/categories", getCategories);

module.exports = router;
