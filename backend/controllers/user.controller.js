const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')


const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};



const signup = async (req, res) => {
  try {
    const { username, email, password, bio, profile, phonenumber } = req.body;
    const userExists = await User.findOne({ email });
    const usernamecheck = await User.findOne({ username });

    if (usernamecheck) return res.status(400).json({ message: "Username already exist" });
    if (userExists) return res.status(400).json({ message: "User already exist" });

    const hashPassword = await bcryptjs.hash(password, 10);

    const createUser = new User({
      username,
      email,
      password: hashPassword,
      bio,
      profile,
      phonenumber,
    });
    await createUser.save();

    const accessToken = generateAccessToken(createUser._id);
    const refreshToken = generateRefreshToken(createUser._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createUser._id,
        username: createUser.username,
        email: createUser.email,
        bio: createUser.bio,
        profile: createUser.profile,
        phonenumber: createUser.phonenumber,
      },
      token: accessToken, 
    });
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
      token: accessToken, 
    });
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.status(500).json({ message: "Internal server error" });
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
    email,
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
        email,
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


const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(decoded.userId);
    res.json({ token: newAccessToken });
  });
};


const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // true in prod
    sameSite: "lax",
    path: "/",     
  });
  res.status(200).json({ message: "Logged out successfully" });
};



module.exports = {
  signup,
  login,
  getUserDataController,
  updateUserController,
  refreshAccessToken,
  logout,
};
