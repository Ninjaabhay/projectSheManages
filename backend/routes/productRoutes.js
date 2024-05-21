// routes/products.js
const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProductsByUserId,
  getProductController,
} = require("../controllers/productsController");

// Route to add a new product
router.post("/add", addProduct);
router.get("/getProducts", getProductController);
// Route to get products by user ID
router.get("/user/:userId", getProductsByUserId);

module.exports = router;
