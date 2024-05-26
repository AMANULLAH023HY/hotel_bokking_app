const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

// user signUp route
router.post("/signup", signupController);

// user login route
router.post("/login", loginController);

module.exports = router;
