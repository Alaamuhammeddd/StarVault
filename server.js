const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

// Middleware
const allowedOrigins = [
  "https://star-vault.vercel.app", // production
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /^https:\/\/star-vault-.*-alaas-projects-4aa2ce46\.vercel\.app$/.test(
          origin
        )
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://star-vault-alaamuhammeddd-alaas-projects-4aa2ce46.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
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
