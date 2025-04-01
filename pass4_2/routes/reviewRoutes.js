const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

router.post('/', async (req, res) => {
  const review = new Review(req.body);
  try {
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;