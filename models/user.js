const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
