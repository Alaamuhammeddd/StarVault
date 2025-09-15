const User = require("../models/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    console.log(">>> registerUser called");
    console.log("Registration request received:", req.body);
    const { username, firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!username || !firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        details:
          "Username, firstName, lastName, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token & expiry
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save user FIRST
    const user = new User({
      username: username.toLowerCase(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
      role: "user",
    });

    const result = await user.save();
    console.log("User saved successfully:", result._id);

    // Try sending verification email but don't block registration if it fails
    try {
      if (process.env.SMTP_HOST) {
        const verifyUrl = `${
          process.env.FRONTEND_URL || "http://localhost:5173"
        }/verify/${verificationToken}`;

        await sendEmail(
          email,
          "Verify Your Email",
          `Click the link to verify your email: ${verifyUrl}\n\nThis link will expire in 1 hour.`
        );

        console.log("Verification email sent successfully");
      } else {
        console.log("SMTP not configured - skipping email verification");
      }
    } catch (emailErr) {
      console.error("Failed to send verification email:", emailErr.message);
      console.error(emailErr.stack);
      // Continue since user is already saved
    }

    res.status(201).json({
      message:
        "Registration successful! Please check your email to verify your account.",
      userId: result._id,
      verificationToken,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);

    res.status(500).json({
      message: "Failed to register user",
      details: err.message,
    });
  }
};

// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    // Find user with valid token & expiry
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};
