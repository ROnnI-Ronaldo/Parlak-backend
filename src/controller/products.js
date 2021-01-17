const Products = require("../model/Products");
const slugify = require("slugify");

exports.createProducts = (req, res) => {
  const { name, price, description, quantity, category, createdBy } = req.body;
  const { files } = req;

  let productPictures;

  if (files.length > 0) {
    productPictures = files.map((file) => {
      return { img: file.filename };
    });
  }

  const products = new Products({
    name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productPictures,
    category,
    createdBy,
  });

  products.save((err, products) => {
    if (err) return res.status(500).json({ msg: err });

    res.status(200).json({ products });
  });
};
