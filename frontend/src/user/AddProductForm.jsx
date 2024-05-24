import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();
  const userId = authUser._id;
  const username = authUser.username;
  const profile = authUser.profile;
  //   console.log(userId);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://shemanages.onrender.com/products/add", {
        userId,
        name,
        username,
        profile,
        category,
        price,
        imageUrl,
      });
      toast.success(response.data.message);
      setName("");
      setCategory("");
      setPrice("");
      setImageUrl("");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-5 mt-16 rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-4 ">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-lg"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
