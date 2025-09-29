import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../urls";
const Logout = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth();


  const handleLogout = async () => {
    try {

      await axios.post(`${baseUrl}/user/logout`, {}, { withCredentials: true });
      setAuthUser({ ...authUser, user: null });
      localStorage.removeItem("Users");
      localStorage.removeItem("token");

      toast.success("Logout Successfully..");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error: " + error.message);
    }
  };



  return (
    <div>
      <button
        className="px-3 py-2 w-full bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
