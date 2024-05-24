import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaWhatsappSquare,
} from "react-icons/fa";
import ReactWhatsapp from "react-whatsapp";

const ProductList = ({ userId }) => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://shemanages.onrender.com/products/user/${userId}`
        );
        setProducts(response.data);
        toast.success("Products fetched successfully...");
      } catch (error) {
        toast.error("Error fetching products");
        console.error("Error fetching products:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getClickedUserdata/${userId}`
        );
        setUserData(response.data);
        toast.success("User data fetched successfully...");
      } catch (error) {
        toast.error("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };

    fetchProducts();
    fetchUserData();
  }, [userId]);

  // Ensure phone number is a string and provide a default value
  const phoneNumber = userData.phonenumber
    ? String(userData.phonenumber)
    : "+919292992992";

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg p-6 md:flex md:items-center">
        <div className="md:w-1/2 md:mr-8">
          <div className="relative h-64 mb-4">
            <img
              src={userData.profile || "https://via.placeholder.com/1200x400"}
              alt="cover"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src={userData.profile}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white absolute bottom-0 transform -translate-y-1/2 -translate-x-1/2 left-1/2"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-2xl font-semibold mb-2">{userData.username}</h1>
          <p className="text-gray-600 mb-4">{userData.bio}</p>
          <p className="text-gray-600">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> {phoneNumber}
          </p>
          <div className="flex space-x-4 mt-4">
            <div>
              <button className="p-2 mt-0 text-xs rounded-xl bg-red-600 text-white">
                Connect With Me On Whatsapp
              </button>
              <ReactWhatsapp
                number={phoneNumber}
                message="I am interested in your work..let's Connect"
              >
                <FaWhatsappSquare className="w-8 h-8 text-center hover:text-green-600 text-green-500" />
              </ReactWhatsapp>
            </div>
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-8 h-8 text-blue-600 hover:text-blue-800 transition-colors" />
            </a>
            <a href={userData.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="w-8 h-8 text-gray-800 hover:text-gray-600 transition-colors" />
            </a>
            <a
              href={userData.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-8 h-8 text-blue-400 hover:text-blue-600 transition-colors" />
            </a>
            <a
              href={userData.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8 text-pink-600 hover:text-pink-800 transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <p>
          <span>Showing 1-12</span> out of {products.length} products
        </p>
        <div className="min-w-fit text-3xl">
          My Products
          <hr className="h-2 mt-2" />
        </div>

        <div className="flex items-center border-2 border-gray-300 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
          <span>Sort by</span>
          <IoMdArrowDropdownCircle className="ml-2 w-6 h-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
