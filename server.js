const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://star-vault-2hspghssi-alaas-projects-4aa2ce46.vercel.app",
      "https://star-vault-ca9jmci1r-alaas-projects-4aa2ce46.vercel.app",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes (with /api prefix for Vercel)
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    console.log("✅ Connected to MongoDB", result.connection.name)
  )
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app; // export for serverless
