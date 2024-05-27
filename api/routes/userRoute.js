const express = require("express");

const { check, validationResult } =require("express-validator");
const {authenticateToken} =require('../middleware/auth')

const {
  signupController,
  loginController,
  verifyTokenController,
} = require("../controllers/userController");

const router = express.Router();

// user signUp route
router.post("/signup",[
    check("firstName", "(First name is required)").isString(),
    check("lastName", "(Last name is required)").isString(),
    check("email", "(email is required)").isEmail(),
    check("password", "( password with 6 or more character required)").isLength({min:6})
], signupController);

// user login route
router.post("/login",[
    check("email", "(email is required)").isEmail(),
    check("password", "( password with 6 or more character required)").isLength({min:6})
], loginController);

// verify token route

router.get('/verify-token',authenticateToken, verifyTokenController);

module.exports = router;
