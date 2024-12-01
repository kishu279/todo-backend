require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

// Creation of schema

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema({
  title: { type: String },
  desc: { type: String },
  isDone: { type: String },
  createDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

const todo = mongoose.model("todo", todoSchema);

// routes mentioned here ...

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        sucess: true,
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

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      sucess: false,
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

  var isPassMatch = await bcrypt.compareSync(password, existingUser.password);

  if (isPassMatch) {
    var token = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET_KEY
    );

    console.log(token);
    return res.status(200).json({
      success: true,
      message: "token created",
    });
  } else {
    return res.status(401).json({
      sucess: false,
      message: "Password do not match",
    });
  }
});

app.post("addTodo", () => {});
app.put("updateTodo", () => {});
app.delete("deleteTodo", () => {});

main();
