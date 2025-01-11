const express = require("express");
const fs = require("fs");
const cors = require("cors");

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET",
};

// Create an Express application
const app = express();

// Use cors middleware
app.use(cors(corsOptions));

// Define a simple route
app.get("/products", (req, res) => {

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);
    const result = jsonData.items.slice(start, end);

    res
      .status(200)
      .json({
      items: result
    });
  });
});

// Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});