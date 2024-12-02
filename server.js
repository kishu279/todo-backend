require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./Model/UserModel");
const Todo = require("./Model/TodoModel");
const mongoose = require("mongoose");
const auth = require("./Middleware/Auth");
const userRoutes = require("./UserRoutes/userRoute");

const app = express();

app.use(express.json());

async function main() {
  // Connecting mongoose
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });

  app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
  });
}

// routes mentioned here ...
app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoutes);

app.get("/user", auth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "protected routes",
  });
}); // Authentication Middleware

app.post("addTodo", () => {});
app.put("updateTodo", () => {});
app.delete("deleteTodo", () => {});

main();
