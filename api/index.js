const express = require("express")
const cors = require("cors");

var corsOptions = {
    origin: "*",
};

const app = express()
app.use(express.json())
app.use(cors(corsOptions));


var users = []

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(users)
    if (users.filter(x => x.username == username && x.password == password).length > 0) {
        res.json({
            "message": "success"
        })
    } else {

        res.status(404).send({
            "message": "user not found"
        })
    }
});


app.post("/register", (req, res) => {
    console.log(req.body)
    users.push(req.body)
    res.json({
        "message": "success"
    })
});

app.listen(8080);