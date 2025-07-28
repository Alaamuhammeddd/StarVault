const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: String,
    publishedYear: Number,
    genre: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
