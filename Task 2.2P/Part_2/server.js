const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Default route (optional)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// ➕ Addition route: http://localhost:3000/add?a=5&b=10
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  // Validate input
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Both query parameters "a" and "b" must be numbers.' });
  }

  const sum = a + b;

  // Return the result as JSON
  res.json({ result: sum });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});