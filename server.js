// Import the Express package
const express = require('express');

// Create an Express application
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Test!');
});

// Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});