const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/today");
    const quoteData = response.data[0]; // Get first quote from array
    res.json({
      q: quoteData.q,
      a: quoteData.a,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quote." });
  }
});

module.exports = router;
