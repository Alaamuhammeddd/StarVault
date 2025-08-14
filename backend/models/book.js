const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    title: String,
    image: String,
    description: String,
    author: String,
    publishedYear: Number,
    genre: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
