const db = require("../config/db");
const bcrypt = require("bcryptjs");

// User signup controller
const signupController = async (req, res) => {
  try {
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
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        let query =
          "INSERT INTO user(firstName, lastName, email, password) VALUES(?, ?, ?, ?)";
        db.query(
          query,
          [user.firstName, user.lastName, user.email, hashedPassword],
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

module.exports = { signupController };
