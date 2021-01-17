const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cors = require("cors");

const userAuth = require("./src/routes/auth");
const adminAuth = require("./src/routes/admin/auth");
const categories = require("./src/routes/category");
const products = require("./src/routes/products");
const cart = require("./src/routes/cart");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "src/uploads")));
//routes
app.use("/api", userAuth);
app.use("/api", adminAuth);
app.use("/api", categories);
app.use("/api", products);
app.use("/api", cart);

mongoose
  .connect(
    `mongodb+srv://bisha:${process.env.MONGO_DB_PASSWORD}@cluster0.u7ncx.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log(`Mongo db connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening in port ${process.env.PORT}`);
});
