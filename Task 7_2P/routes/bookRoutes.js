const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// No POST here because app.js handles POST /api/books with io
router.get('/', bookController.getAllBooks);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;