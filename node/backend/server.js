const express = require('express');
const cors = require('cors');
const db = require('./models/userModel'); // Import the database connection and initialization
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Simple endpoint to test server connection
app.get('/api/message', (req, res) => {
  res.json({ message: "Hello from Node.js" });
});

// Additional route example to fetch users (you can extend this further)
app.get('/api/users', (req, res) => {
  // Example query to fetch users
  const query = 'SELECT * FROM users';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js server running on port ${port}`);
});
