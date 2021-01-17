const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 10,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      min: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.virtual("password").set((password) => {
//   const salt = bcryptjs.genSaltSync(10);
//   this.hash_password = bcryptjs.hashSync(password, salt);
// });

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
  authenticate: function (password) {
    return bcryptjs.compareSync(password, this.hashedPassword);
  },
};

module.exports = mongoose.model("User", userSchema);
