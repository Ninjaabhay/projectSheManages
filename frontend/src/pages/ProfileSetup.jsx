import { useEffect } from "react";
import { baseUrl } from "../urls";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const navigate = useNavigate();
  // The logic flow here is that, once the user successfully signs up, we will save it to the database and and redirect it to the profile page.
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    // This will handle userCreation
    const handleUserCreationInDB = async () => {
      if (isLoaded && isSignedIn) {
        // Create a user in the database
        try {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const response = await axios.post(`${baseUrl}/user/signup`, {
            email: userEmail,
            profilePic: user.imageUrl
          });

          console.log(response);

          if (response.status === 200 && response.data.exists) {
            // If user exists, redirect them to their profile
            const userId = response.data.userId;
            console.log("Here");         
            navigate(`/products/myproduct/${userId}`);
          }
          
          // If user is created successfully
          if (response.status === 201) {
            const userId = response.data.user?.userId;
            navigate(`/products/myproduct/${userId}`);
          }
        } catch (error) {
          console.log("Error in saving user to database: ", error);
        }
      }
    };

    console.log("Running useEffect");
    handleUserCreationInDB();
  }, [isLoaded]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-violet-500 mb-6"></div>

      {/* Message */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Please wait...
      </h1>
      <p className="text-gray-600 text-center max-w-sm">
        We are setting up your profile. This may take a few seconds.
      </p>
    </div>
  );
};

export default ProfileSetup;
