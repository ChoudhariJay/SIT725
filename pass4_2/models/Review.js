const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  reviewer: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

module.exports = mongoose.model('Review', reviewSchema);