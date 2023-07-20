require('dotenv').config();
const express = require("express");
require('express-async-errors');
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require('./routes/authRoute');
const { errorHandlerMiddleware } = require("./middleware/errorHandler");
// const  = require("./middleware/asyncHandler");

var corsOptions = {
    origin: "*",
};

mongoose.connect(process.env.MONGO_CONNECTION_URL)

const app = express()
app.use(express.json())
app.use(cors(corsOptions));



app.use('/auth', authRoute);


app.use(errorHandlerMiddleware);




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

