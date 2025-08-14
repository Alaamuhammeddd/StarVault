require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // adjust path if needed

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@example.com";
    const username = "admin";
    const firstName = "admin";
    const lastName = "admin";
    const password = "AdminPassword123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log("⚠️ Admin already exists:", adminExists.email);
      process.exit(0);
    }

    const admin = new User({
      name: "Super Admin",
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
      role: "admin", // 👈 this makes them admin
      isVerified: true,
    });

    await admin.save();
    console.log("✅ Admin created successfully:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
})();
