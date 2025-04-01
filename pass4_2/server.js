const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/bookreviews';

app.use(express.json());
app.use(express.static('public'));

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));