const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./../Model/UserModel");

const app = express();
const router = express.Router();

app.use(express.json());

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Authorization Failed",
    });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);

    const email = decoded.email;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    req._id = decoded._id;
    console.log(req._id);

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to Authenticate",
    });
  }
};

router.post("/auth", authenticate);

module.exports = router;
