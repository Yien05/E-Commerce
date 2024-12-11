// import express
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());

// setup cors policy
app.use(cors())

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/online_store")
  .then(() => {
    // if mongodb is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/", (req, res) => {
  res.send("Happy coding!");
});

// import all the routes
const productRouter = require("./routes/product");
const categoriesRouter = require("./routes/categories");


app.use("/products", productRouter);
app.use("/categories", categoriesRouter);

// start the server
app.listen(5555, () => {
    console.log("Server is running at http://localhost:5555");
  });
  