const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookController = require('./controllers/bookController'); // add this

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/bookreviews';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use('/api/reviews', reviewRoutes);

// Modified POST /api/books to pass io for real-time socket event
app.post('/api/books', (req, res) => bookController.createBook(req, res, io));

// Other book routes
app.get('/api/books', bookController.getAllBooks);
app.put('/api/books/:id', bookController.updateBook);
app.delete('/api/books/:id', bookController.deleteBook);

// MongoDB + Server startup
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      server.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
      });
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
}

module.exports = app;