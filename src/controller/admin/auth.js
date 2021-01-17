const User = require("../../model/User");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//@router   POST /auth/signin
//@desc     sign in a user
//@access   PUBLIC

exports.adminSignIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Access Denied" });
  }

  const isUserValid = user.authenticate(password);

  if (!isUserValid || user.role !== "admin") {
    return res.status(401).json({ msg: "Access Denied" });
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.status(200).json({
    token,
    user: {
      user,
    },
  });
};

//@route    /api/signup POST
//@des      Register a user
//@access    public

exports.adminSignUp = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (role === "admin") {
    const userExist = await User.findOne({ email });

    if (userExist) return res.status(400).json({ msg: "User already exist" });

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      role: "admin",
    });

    await user.save((err, user) => {
      if (err) return res.status(400).json({ msg: "Something went wrong" });

      return res.status(200).json({
        user,
      });
    });
  } else {
    return res.status(400).json({ msg: "Access Denied" });
  }
};

exports.signOut = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Sign out successfully" });
};
