const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid password");

  // EMAIL VERIFICATION LOGIC

  // if (!process.env.JWT_SECRET) {
  //   return res.status(500).send("JWT secret not configured");
  // }
  if (user.role !== "admin" && !user.isVerified) {
    return res.status(403).json({
      message: "Please verify your email first",
      redirect: "/verify-email",
    });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role }, // role here!
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    token,
  });
});

module.exports = router;
