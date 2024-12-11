const express = require("express");
const router = express.Router();

const { getCategories } = require("../controller/categories");

router.get("/", async (req, res) => {
  const categories = await getCategories();
  res.status(200).send(categories);
});

module.exports = router;
