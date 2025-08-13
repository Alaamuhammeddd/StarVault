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

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/login"));

app.get("/", (req, res) => res.send("Library API is running"));
app.get("/api/test", (req, res) => res.json({ message: "Backend working!" }));

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
