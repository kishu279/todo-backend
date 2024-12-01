const express = require("express");
const PORT = 3000;
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

// routes mentioned here ...

app.post("signup", () => {});
app.post("signin", () => {});
app.post("addTodo", () => {});
app.post("updateTodo", () => {});
app.post("deleteTodo", () => {});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}
    `);
});
