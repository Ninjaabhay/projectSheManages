// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";
import axios from "axios";
import { baseUrl } from "../urls";

function Navbar() {
  const [active, setActive] = useState("Home");
  const { isSignedIn, user, isLoaded } = useUser();
  const [localUser, setLocalUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // In the NavBar, we are saving the user to the local storage
  useEffect(() => {
    const getUserDataByEmail = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}/user/get-user-data-by-email`,
          { email: user.primaryEmailAddress.emailAddress }
        );

        if (response.status === 200 && response.data.exists) {
          setLocalUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.log("Error in getting user data by email: ", error);
      }
    };

    if (isLoaded && isSignedIn) {
      getUserDataByEmail();
    }
  }, [isLoaded, user, isSignedIn]);

  return (
    <nav
      className="bg-white border-b border-gray-200 container sm:max-w-screen-2xl mx-auto px-8  mb-
    20"
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link
          className="text-2xl font-bold text-primary hover:text-secondary hover:border-2 hover:border-pink-400 duration-300 p-1 mr-2 ml-0 m-1 rounded-3xl"
          to="/"
          onClick={() => setActive("Home")}
        >
          SheManages
        </Link>
        <button
          className="text-secondary md:hidden focus:outline-none focus:ring-2 rounded-md focus:ring-subHeading border-none hover:scale-125 duration-500"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            className="h-6 w-6 text-heading"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className="hidden md:flex space-x-4 md:justify-center items-center"
          id="navbarNav"
        >
          <Link
            className="text-heading hover:text-subHeading px-3 py-2 hover:bg-blue-100 rounded-md"
            to="/"
            onClick={() => setActive("Home")}
          >
            Home
            {active === "Home" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>

          <Link
            className="text-heading hover:text-subheading rounded-lg px-3 py-2 hover:bg-blue-100"
            to="/resources"
            onClick={() => setActive("Resources")}
          >
            Resources
            {active === "Resources" ? (
              <hr className=" h-1 text-heading  bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>
          <Link
            className="text-heading hover:text-gray-600 rounded-md hover:bg-blue-100 px-3 py-2"
            to="/products"
            onClick={() => setActive("Products")}
          >
            Products
            {active === "Products" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>
          <Link
            className="block text-heading hover:bg-blue-100 rounded-md px-3 py-2"
            to="/ideas"
            onClick={() => setActive("Ideas")}
          >
            Ideas
            {active === "Ideas" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>

          {isSignedIn ? (
            <Link
              className="block text-heading hover:bg-blue-100 rounded-md px-3 py-2"
              to="/addproduct"
              onClick={() => setActive("Add Item")}
            >
              Add Item
              {active === "Add Item" ? (
                <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}

          {isSignedIn && isLoaded ? (
            <Link
              className="block text-heading hover:bg-blue-100 rounded-md px-3 py-2"
              to={`products/myproduct/${localUser?.userId}`}
              onClick={() => setActive("Profile")}
            >
              Profile
              {active === "Profile" ? (
                <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}

          {isLoaded && isSignedIn ? (
            <SignOutButton>
              <button className="bg-primary hover:bg-secondary text-white p-2 rounded-lg ">
                Logout
              </button>
            </SignOutButton>
          ) : (
            <Link to="/login">
              <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="block text-heading rounded-md px-3 py-2"
            to="/"
            onClick={() => setActive("Home")}
          >
            Home
            {active === "Home" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>
          <Link
            className="block text-heading rounded-md px-3 py-2"
            to="/resources"
            onClick={() => setActive("Resources")}
          >
            Resources
            {active === "Resources" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>
          <Link
            className="block text-heading  rounded-md px-3 py-2"
            to="/products"
            onClick={() => setActive("Products")}
          >
            Products
            {active === "Products" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>
          <Link
            className="block text-heading  rounded-md px-3 py-2"
            to="/ideas"
            onClick={() => setActive("Ideas")}
          >
            Ideas
            {active === "Ideas" ? (
              <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
            ) : (
              ""
            )}
          </Link>

          {isLoaded && isSignedIn ? (
            <Link
              className="block text-heading  rounded-md px-3 py-2"
              to="/addproduct"
              onClick={() => setActive("Add Item")}
            >
              Add Item
              {active === "Add Item" ? (
                <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}

          {isLoaded && isSignedIn ? (
            <Link
              className="block text-heading  rounded-md px-3 py-2"
              to={`products/myproduct/${localUser?.userId}`}
              onClick={() => setActive("Profile")}
            >
              Profile
              {active === "Profile" ? (
                <hr className=" h-1 text-heading bg-heading rounded-full"></hr>
              ) : (
                ""
              )}
            </Link>
          ) : (
            ""
          )}

          {isLoaded && isSignedIn ? (
            <SignOutButton signOutCallback={() => localStorage.removeItem("user")}>
              <button className="bg-primary hover:bg-secondary text-white p-2 rounded-lg">
                Logout
              </button>
            </SignOutButton>
          ) : (
            <Link to="/login">
              <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
