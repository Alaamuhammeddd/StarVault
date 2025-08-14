const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome, admin!", user: req.user });
});

module.exports = router;
