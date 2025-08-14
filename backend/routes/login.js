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
  if (!user.isVerified)
    return res.status(400).send("Please verify your email first");
  // if (!process.env.JWT_SECRET) {
  //   return res.status(500).send("JWT secret not configured");
  // }

  // Generate JWT token
  // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  //   expiresIn: "1d",
  // });
  // res.json({ token });

  res.json({
    message: "Login successful",
    user: { id: user._id, email: user.email },
  });
});

module.exports = router;
