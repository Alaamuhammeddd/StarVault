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
      "https://star-vault-front.vercel.app", // frontend prod
      "http://localhost:5173", // frontend dev
      "http://localhost:3000", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

// Routes (no /api prefix now)
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Backend working!" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    console.log("✅ Connected to MongoDB", result.connection.name)
  )
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;
