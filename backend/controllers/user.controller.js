const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  // Since we are using Clerk's authentication
  // We are only going to get email from it and then get the remaining details later
  // We will only be receiving email from body
  // Username initially will be the preceding words before @ in the email
  try {
    const { email, profilePic } = req.body;
    const user = await User.findOne({ email });
    // TODO: Put username check in a different function
    // Checking is user is present
    if (user) {
      return res.status(200).json({
        message: "User already exist",
        exists: true,
        // Sending userId, so we can transfer the user to profile page if the account already exists.
        userId: user._id,
      });
    }

    // Create a user
    const createUser = new User({
      username: email?.split("@")[0] || email,
      email: email,
      profile:
        profilePic ||
        "https://getdrawings.com/free-icon/woman-profile-icon-68.png",
    });

    // User gets saved
    await createUser.save();

    // On successful creation, only return id, username and email.
    res.status(201).json({
      message: "User created successfully",
      user: {
        userId: createUser._id,
        username: createUser.username,
        email: createUser.email,
      },
    });
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch || !user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    } else {
      res.status(200).json({
        message: "Login Successfully..",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profile: user.profile,
          phonenumber: user.phonenumber,
        },
      });
    }
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserDataController = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching user data for userId:", userId);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
};

const updateUserController = async (req, res) => {
  const { userId } = req.params;
  const {
    username,
    bio,
    phonenumber,
    linkedin,
    github,
    twitter,
    instagram,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        phonenumber,
        linkedin,
        github,
        twitter,
        instagram,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserDataByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({
        exists: true,
        user: {
          userId: user._id,
          username: user.username,
          profile: user.profile,
          email: user.email,
        },
      });
    } else {
      res.status(200).json({
        exists: false
      })
    }

  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  signup,
  login,
  getUserDataController,
  updateUserController,
  getUserDataByEmail
};
