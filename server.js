const express = require("express");
const fs = require("fs");
const cors = require("cors");

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Create an Express application
const app = express();

// Use cors middleware
app.use(cors(corsOptions));

// Add middleware to parse JSON request bodies
app.use(express.json());

// Define a simple route
app.get("/products", (req, res) => {

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data); 
    const result = jsonData.products;

    res
      .status(200)
      .json({
      items: result
    });
  });
});

app.post("/products", (req, res) => {
  const { 
    name,
    price,
    description,
    category,
    image,
    stock,
    dimensions,
    material,
    rating,
    warranty,
    isFeatured
  } = req.body;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const maxId = jsonData.products.reduce(
      (max, product) => Math.max(max, product.id),
      0
    );

    const newItem = {
      id: maxId + 1,
      name,
      price,
      description,
      category,
      image,
      stock,
      dimensions,
      material,
      rating,
      warranty,
      isFeatured
    };

    jsonData.products.push(newItem);

    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(newItem);
    });
  });
});

app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { 
    name,
    price,
    description,
    category,
    image,
    stock,
    dimensions,
    material,
    rating,
    warranty,
    isFeatured
  } = req.body;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.products.findIndex((product) => product.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.products[index] = {
      id,
      name,
      price,
      description,
      category,
      image,
      stock,
      dimensions,
      material,
      rating,
      warranty,
      isFeatured
    };

    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).json(jsonData.products[index]);
    });
  });
});

app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.products.findIndex((product) => product.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.products.splice(index, 1);

    fs.writeFile("db.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

// Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});