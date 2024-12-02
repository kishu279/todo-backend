require("dotenv").config();
const express = require("express");
const auth = require("./../Middleware/Auth");

const mongoose = require("mongoose");
const Todo = require("../Model/TodoModel");

const app = express();
app.use(express.json());
const router = express.Router();

async function addtodos(req, res) {
  try {
    console.log(req.body);
    const { title, desc } = req.body;
    // value ko check kr properly

    if (!title || !desc) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    await Todo.create({
      title: title,
      desc: desc,
      userId: req._id,
      isDone: false,
      createDate: Date.now(),
    });

    return res.status(200).json({
      success: true,
      message: "Todo added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the todo.",
      error: error.message,
    });
  }
}

router.post("/addtodos", auth, addtodos);

const updateTodos = async (req, res) => {
  const isDone = parseInt(req.params.isDone);

  const { title, desc } = req.body;

  const existingUser = await Todo.findOne({ title: title });

  if (!existingUser || existingUser._id != req._id) {
    return res.status(404).json({
      success: false,
      message: "error in any of the field",
    });
  }

  await existingUser.updateOne({
    desc: desc,
    isDone: isDone == 1 ? true : false,
  });

  return res.status(200).json({
    success: true,
    message: "updated",
  });
};

router.put("/updatetodos/:isDone", updateTodos);

module.exports = router;
