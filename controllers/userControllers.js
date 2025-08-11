const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
exports.registerUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    const result = await user.save();

    // Create verification link
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

    // Send verification email
    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verifyUrl}`
    );

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      userId: result._id,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(400).json({ error: "Failed to register user" });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ error: "Server error" });
  }
};
