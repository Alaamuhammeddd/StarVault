const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = express();

// Middleware
// --- CORS middleware: must be first ---
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://star-vault-lkma.vercel.app", // production frontend
  "http://localhost:3000", // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true, // allow cookies/auth headers if needed
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

module.exports = serverless(app);
