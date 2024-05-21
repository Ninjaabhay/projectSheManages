// controllers/productsController.js
const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  const { userId, username, profile, name, category, price, imageUrl } =
    req.body;

  try {
    const product = new Product({
      userId,
      username,
      profile,
      name,
      category,
      price,
      imageUrl,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

exports.getProductsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getProductController = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
