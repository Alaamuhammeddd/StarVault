const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// REGISTER USER
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

    // Generate verification token & expiry
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Create verification link
    const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

    // Send verification email BEFORE saving user
    await sendEmail(
      email,
      "Verify Your Email",
      `Click the link to verify your email: ${verifyUrl}\n\nThis link will expire in 1 hour.`
    );

    // Save user
    const user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    const result = await user.save();

    res.status(201).json({
      message:
        "User registered successfully. Please check your email to verify your account.",
      userId: result._id,
      verificationToken,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(400).json({ error: "Failed to register user" });
  }
};

// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    // Find user with valid token & expiry
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() }, // compare with Date object
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ error: "Server error" });
  }
};
