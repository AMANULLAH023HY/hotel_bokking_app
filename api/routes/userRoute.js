const express = require('express');
const { signupController } = require('../controllers/userController');

const router = express.Router();

// user signUp route
router.post("/signup", signupController);


module.exports = router;