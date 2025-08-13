const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes (no /api prefix now)
const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);

// Test route
app.get("/test", (req, res) => {
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
