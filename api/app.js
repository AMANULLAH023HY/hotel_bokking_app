const express = require("express");
const db = require("./config/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cockieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cockieParser());

// user route
const userRoute = require('./routes/userRoute')
app.use('/api/user',userRoute)

app.all("*", (req, res) => {
  res.status(400).json({
    message: "OOPS!, Page not found",
  });
});

module.exports = app;
