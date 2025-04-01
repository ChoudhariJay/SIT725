const express = require('express');
const Book = require('../models/Book');
const Review = require('../models/Review');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('📥 Incoming book data:', req.body);

  const book = new Book(req.body);
  try {
    const saved = await book.save();
    console.log('✅ Book saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving book:', err.message);
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ bookId: req.params.id });
    res.json({ message: '📕 Book and reviews deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;