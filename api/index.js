require('dotenv').config();
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");

const User = require('./models/User');

var corsOptions = {
    origin: "*",
};

mongoose.connect(process.env.MONGO_CONNECTION_URL)

const app = express()
app.use(express.json())
app.use(cors(corsOptions));



app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({
        "message": "success"
    })
});


app.post("/register", async (req, res) => {
    console.log(req.body)
    const { username, email, password } = req.body;
    const userDoc = await User.create({
        username, email, password
    });
    res.json({
        "message": "success",
        "user": userDoc
    })
});

app.listen(8080);

