import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../urls";
import { useDropzone } from "react-dropzone";

const AddProductForm = () => {
  const navigate = useNavigate();

  // Instead of using useAuth, we are directly getting the user from local storage.
  // Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const authUser = storedUser ? JSON.parse(storedUser) : null;

  // Extract properties safely
  const userId = authUser?.userId || null;
  const username = authUser?.username || "";
  const profile = authUser?.profile || "";

  const [name, setName] = useState("");
  const [category, setCategory] = useState("clothes");
  const [price, setPrice] = useState("");

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // don't allow multiple files
    accept: {
      "image/*": [],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the file and data to the formData
    const formData = new FormData();
    formData.append("image", files[0]);
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("profile", profile);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);

    try {
      const response = await axios.post(`${baseUrl}/products/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

      // Clean up old previews to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));

      // Reset the fields
      setName("");
      setCategory("clothes");
      setPrice("");
      setFiles([]);

      // Navigate
      navigate("/products");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/diversity-multiethnic-women-women-different-culture-different-countries_834602-59483.jpg?size=626&ext=jpg')",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        opacity: "1",
        height: "100%",
      }}
    >
      <div className="max-w-lg mx-auto p-8 pt-4 rounded-lg shadow-lg">
        <div className="p-3 bg-heading rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-100">
            Add New Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-50 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full bg-white text-heading px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-50 font-medium mb-2">
                Category
              </label>
              <select
                className="w-full  bg-white text-heading px-3 p-1 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="clothes" className="p-1">
                  Clothes
                </option>
                <option value="art & craft" className="p-1">
                  Art & Craft
                </option>
                <option value="painting" className="p-1">
                  Painting
                </option>
                <option value="pottery" className="p-1">
                  Pottery
                </option>
                <option value="statue" className="p-1">
                  Statue
                </option>
                <option value="utensils">Utensils</option>
                <option value="food" className="p-1">
                  Food
                </option>
                <option value="toy" className="p-1">
                  Toy
                </option>
                <option value="basket" className="p-1">
                  Basket
                </option>
                <option value="wooden material" className="p-1">
                  Wooden Material
                </option>
                <option value="other" className="p-1">
                  Other
                </option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-50 font-medium mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full bg-white text-heading px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-50 font-medium mb-2">
                Upload Product Image
              </label>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #888",
                  padding: "40px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "white",
                  borderRadius: "10px",
                  color: "#203061",
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag & drop some files here, or click to select files</p>
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
                {files.map((file) => (
                  <div key={file.name}>
                    <img
                      src={file.preview}
                      alt={file.name}
                      style={{ width: "100px", marginRight: "10px" }}
                    />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
