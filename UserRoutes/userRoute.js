require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./../Model/UserModel");

const app = express();
app.use(express.json());
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "Provide all details",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "try to make account with different email",
      });
    }
    var hashPass = await bcrypt.hash(password, 10);
    User.create({
      username: username,
      password: hashPass,
      email: email,
    });

    return res.status(200).json({
      success: true,
      message: "Hii there your account successfully created",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Pls Provie all details",
    });
  }
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  var isPassMatch = await bcrypt.compare(password, existingUser.password);

  if (isPassMatch) {
    var token = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "5h",
      }
    );

    User.token = token;

    console.log(token);
    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Password do not match",
    });
  }
});

module.exports = router;
