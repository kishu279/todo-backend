require("dotenv").config();
const express = require("express");
const auth = require("./../Middleware/Auth");

const mongoose = require("mongoose");
const User = require("../Model/UserModel");
const Todo = require("../Model/TodoModel");

const app = express();
app.use(express.json());
const router = express.Router();

async function addtodos(req, res) {
  const { title, desc } = req.body;

  Todo.create({
    title: title,
    desc: desc,
    userId: req._id,
    isDone: false,
    createDate: Date.now(),
  });

  return res.status(200).json({
    sucess: true,
    message: "todo added successfully",
  });
}

router.post("/addtodos", auth, addtodos);

module.exports = router;
