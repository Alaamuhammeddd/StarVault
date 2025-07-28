const express = require("express");
const router = express.Router();
const { getAllBooks, addBook } = require("../controllers/bookControllers");

router.get("/", getAllBooks);
router.post("/", addBook);

module.exports = router;
