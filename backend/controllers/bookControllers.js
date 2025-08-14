const Book = require("../models/book");
exports.getAllBooks = (req, res) => {
  Book.find()
    .select("_id title author publishedYear genre")
    .then((books) => res.json(books))
    .catch((err) => {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Failed to fetch books" });
    });
};

exports.addBook = async (req, res) => {
  try {
    const book = new Book({
      _id: req.body.bookIsbn,
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
      genre: req.body.genre,
    });
    const result = await book.save();
    res.send(`Book added successfully: ${result.title}`);
  } catch (err) {
    console.error("Error saving book:", err);
    res.status(400).json({ error: "Failed to add book" });
  }
};
