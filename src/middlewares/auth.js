const jwt = require("jsonwebtoken");
// const User = require("../model/User");

exports.requireSignIn = async (req, res, next) => {
  let { authorization } = req.headers;

  if (authorization) {
    authorization = authorization.split(" ")[1];
    const user = jwt.verify(authorization, process.env.JWT_SECRET);
    if (!user) return res.status(400).json({ msg: "Access Denied" });

    req.user = user;

    next();
  } else {
    res.status(400).json({ msg: "Access Denied" });
  }
};

exports.userSignIn = (req, res, next) => {
  if (req.user.role !== "user")
    return res.status(403).json({ msg: "Access Denied" });

  next();
};

exports.adminSignIn = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Access Denied" });

  next();
};
