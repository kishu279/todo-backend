const express = require("express");
    
const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/signup", (req, res) => {
    try{
        const {username, password} = req.body;





    } catch(error) {
        console.log(error);
    }
});

app.listen(3000);
