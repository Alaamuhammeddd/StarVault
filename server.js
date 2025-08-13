const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies or auth headers
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);
const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);
// Root
app.get("/", (req, res) => {
  res.send("Library API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    console.log("✅ Connected to MongoDB", result.connection.name)
  )
  .catch((err) => console.error("❌ MongoDB connection error:", err));
