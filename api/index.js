require('dotenv').config();
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");

var corsOptions = {
    origin: "*",
};

mongoose.connect(process.env.MONGO_CONNECTION_URL)

const app = express()
app.use(express.json())
app.use(cors(corsOptions));

require("./routes/authRoute")(app);


app.listen(8080);

