const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

app.use(express.json());

// Connecting mongoose
mongoose
  .connect(
    "mongodb+srv://subh:nainasweetheart@cluster0.nzujy.mongodb.net/Todo-backend"
  )
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// Creation of schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const todoSchema = new mongoose.Schema({
  userId: { type: String },
  title: { type: String },
  isDone: { type: Boolean },
  desc: { type: String },
  createDate: { type: Date, default: Date.now },
});

// Model Created
const User = mongoose.model("User", userSchema);
// const todo = mongoose.model('todo', todoSchema);

// routes mentioned here ...

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (username && password) {
      User.create({
        username: username,
        email: email,
        password: password,
      })
        .then((user) => {
          console.log("User created successfully");
        })
        .catch((error) => {
          console.log(error);
        });

      return res
        .status(201)
        .send({ message: `Hii there you'r account created successfully` });
    }
  } catch (error) {
    console.log(error);
  }
});

// app.post("signin", () => {});
// app.post("addTodo", () => {});
// app.put("updateTodo", () => {});
// app.delete("deleteTodo", () => {});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}
    `);
});
