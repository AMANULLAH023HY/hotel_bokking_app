const db = require("../config/db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { check, validationResult } =require("express-validator");



// User signup controller
const signupController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            message:errors.array()
        })
    } 


    const user = req.body;
    let query = "SELECT email FROM user WHERE email = ?";
    db.query(query, [user.email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }
      //   User exist
      if (result.length > 0) {
        return res.status(400).json({
          message: "Email already in use",
        });
      }

      try {
        let query =
          "INSERT INTO user(firstName, lastName, email, password) VALUES(?, ?, ?, ?)";
        db.query(
          query,
          [user.firstName, user.lastName, user.email, user.password],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: "Something went wrong",
                error: err.message,
              });
            }
            res.status(201).json({
              message: "User registered successfully!",
              user: {
                id: result.insertId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            });
          }
        );
      } catch (hashError) {
        res.status(500).json({
          message: "Error hashing password",
          error: hashError.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};



// // User login controller
const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            message:errors.array()
        })
    } 
    const { email, password } = req.body;
    let query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      const user = result[0];
      // Generate JWT token
      const response = { email: user.email, password: user.password };
      const accessToken = JWT.sign(response, process.env.ACCESS_TOKEN, {
        expiresIn: "8h",
      });

      res.status(200).json({
        message: "Login successful!",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token: accessToken,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: error.message,
    });
  }
};


// verify token controller
const verifyTokenController = (req,res)=>{
  try {
    res.status(200).json({
     message:"Token verify successfully!",
     userId:req.userId
    })
    
  } catch (error) {
    res.status(500).json({
      message:"Internal server Error",
      error:error.message
    })
    
  }
}

module.exports = { signupController, loginController,verifyTokenController };
