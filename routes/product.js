const express = require("express");
//create a router for products
const router = express.Router();

// import functions from controller
const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product");

/* 
  create the routes (CRUD)
  GET /products - get all the products
  GET /products/:id - get one product by id
  POST /products - add new product
  PUT /products/:id - update product
  DELETE /products/:id - delete product
*/

// get all the products. Pointing to /products
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    // use the getProducts from the controller to laod the products data
    const products = await getProducts(category);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// add product
// POST http://localhost:5555/products
router.post("/", async (req, res) => {
  try {
    // retrieve the data from req.body
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check for error
    if (!name || !description || !price || !category) {
      return res.status(400).send({
        error: "Required data is missing",
      });
    }

    // pass in all the data to addNewProduct function
    const newProduct = await addNewProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    // if there is an error, return the error code
    res.status(400).send({
      error: error._message,
    });
  }
});

// update product
// PUT http://localhost:5555/products/9kdm40ikd93k300dkd3o
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    // pass in the data into the updateProduct function
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete product
// DELETE http://localhost:5555/products/9kdm40ikd93k300dkd3o
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // trigger the deleteProduct function
    await deleteProduct(id);
    res.status(200).send({
      message: `Product with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;
