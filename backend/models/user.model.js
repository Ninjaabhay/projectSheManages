const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Username number must contain 3 letters."],
    maxLength: [30, "Phone number must less than 30 letters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // No need for password, as it is going to be stored with Clerk
  bio: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    default: "https://getdrawings.com/free-icon/woman-profile-icon-68.png",
  },
  phonenumber: {
    type: Number,
    required: false,
    minLength: [10, "Phone number must contain 10 Digits."],
    maxLength: [10, "Phone number must contain 10 Digits."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
