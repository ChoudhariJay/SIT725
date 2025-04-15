const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const saved = await book.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    const booksWithReviews = await Promise.all(
      books.map(async (book) => {
        const reviews = await Review.find({ bookId: book._id });
        return { ...book.toObject(), reviews };
      })
    );
    res.json(booksWithReviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ bookId: req.params.id });
    res.json({ message: 'Book and related reviews deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};