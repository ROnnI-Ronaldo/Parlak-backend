const Category = require("../model/Category");
const Slugify = require("slugify");

const getCategories = (categories, parentId = null) => {
  let categoriesList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == "null");
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoriesList.push({
      _id: cat._id,
      categoryName: cat.categoryName,
      slug: cat.slug,
      children: getCategories(categories, cat._id),
    });
  }

  return categoriesList;
};

exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;

  let categories = {
    categoryName,
    slug: Slugify(categoryName),
  };

  if (req.file) {
    categories.categoryUrl = process.env.API + "/public/" + req.file.filename;
  }

  categories = new Category(categories);

  if (req.body.parentId) {
    categories.parentId = req.body.parentId;
  }

  categories.save((err, cat) => {
    if (err) return res.status(500).json({ err: err });
    return res.status(200).json({ category: categories });
  });
};

exports.getCategories = (req, res) => {
  Category.find({})
    .then((cat) => {
      if (!cat) return res.status(500).json({ msg: "Something went wrong!" });
      const categories = getCategories(cat);
      return res.status(200).json({ categories });
    })
    .catch((err) => {
      res.status(500).json({ msg: err });
    });
};
