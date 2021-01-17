const Cart = require("../model/Cart");

exports.addToCart = async (req, res) => {
  //check if this user have already a cart
  const userCart = await Cart.findOne({ user: req.user.id });
  if (userCart) {
    //check if item is already in cartList
    const isItemExisting = await userCart.itemsList.find(
      (cart) => cart.product == req.body.itemsList.product
    );

    if (isItemExisting) {
      //update quantity
      Cart.findOneAndUpdate(
        {
          user: req.user.id,
          "itemsList.product": req.body.itemsList.product,
        },
        {
          $set: {
            "itemsList.$": {
              ...req.body.itemsList,
              quantity:
                isItemExisting.quantity + (req.body.itemsList.quantity || 1),
            },
          },
        }
      ).exec((err, cart) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({ msg: "Items updated successfully" });
      });
    } else {
      //push new item
      Cart.findOneAndUpdate(
        {
          user: req.user.id,
        },
        {
          $push: {
            itemsList: req.body.itemsList,
          },
        }
      ).exec((err, cart) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({ msg: "Items added successfully" });
      });
    }
  } else {
    //create new cart for this user
    const cart = new Cart({
      user: req.user.id,
      itemsList: [req.body.itemsList],
    });

    cart.save((err, cart) => {
      if (err) return res.status(500).json({ msg: err });

      return res.status(200).json({ msg: cart });
    });
  }
};
