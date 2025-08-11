const express = require("express");
const { registerUser, verifyEmail } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyEmail);

module.exports = router;
