const express = require("express");
const app = express();

app.use(express.json());

// routes mentioned here ...

app.post("signup", () => {});
app.post("signin", () => {});
app.post("addTodo", () => {});
app.put("updateTodo", () => {});
app.delete("deleteTodo", () => {});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}
    `);
});
