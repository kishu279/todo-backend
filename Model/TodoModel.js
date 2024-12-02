const mongoose = require("mongoose");
const User = require('./UserModel');


const todoSchema = new mongoose.Schema({
  title: { type: String },
  desc: { type: String },
  isDone: { type: Boolean },
  createDate: { type: Date, default:Date.now() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
