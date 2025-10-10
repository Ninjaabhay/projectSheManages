// controllers/productsController.js
const Product = require("../models/product.model");
const removeFile = require("../utils/fileRemover");
const handleMulterUpload = require("../utils/fileUploader");

exports.addProduct = async (req, res) => {
  // The first thing we have to do is process the image
  const file = await handleMulterUpload(req, res, "image"); // Image comes directly from the form data

  const { userId, username, profile, name, category, price } = req.body;

  try {
    const product = new Product({
      userId,
      username,
      profile,
      name,
      category,
      price,
      image: {
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
    // Save to Database
    await product.save();

    // Response
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.log(error);
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

// Controller function to handle product deletion
// Controller function to handle product deletion
exports.deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Product.findByIdAndDelete(productId);

    if (result.image && result.image.path){
      await removeFile(result.image.path)
    } 

    if (result) {
      res.status(200).send({ message: "Product deleted successfully" });
    } else {
      res.status(404).send({ error: "Product not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while deleting the product" });
  }
};

exports.updateProductController = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};
