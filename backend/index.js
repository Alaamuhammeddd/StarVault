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

// Request logging
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);
const quoteRoutes = require("./routes/quoteOfTheday");
app.use("/quote", quoteRoutes);
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const loginRoutes = require("./routes/login");
app.use("/login", loginRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API works on Vercel!" });
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("🔥 Global error:", err);
//   console.error("🔥 Message:", err.message);
//   console.error("🔥 Stack:", err.stack);
//   res.status(err.status || 500).json({
//     error: err.message || "Something went wrong!",
//   });
// });

// 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     error: `Cannot ${req.method} ${req.url}`,
//   });
// });

// Connect to MongoDB first
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB:", mongoose.connection.name);

    // Start server after DB connection
    if (process.env.NODE_ENV !== "production") {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// Start the server
startServer();

// Export for serverless
module.exports = serverless(app);
