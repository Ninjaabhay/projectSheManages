const express = require("express");
const {
  signup,
  login,
  getUserDataController,
  updateUserController,
  getUserDataByEmail,
  //   getSingleUserDataController,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getClickedUserdata/:userId", getUserDataController);
router.put("/updateProfile/:userId", updateUserController);
router.post("/get-user-data-by-email", getUserDataByEmail);
// router.post("/getSingleUserData", getSingleUserDataController);

module.exports = router;
