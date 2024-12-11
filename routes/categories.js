const express = require("express");
const router = express.Router();

const { getCategories } = require("../controller/categories");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      error: "Unable to retrieve categories",
    });
  }
});

module.exports = router;
