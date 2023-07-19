require('dotenv').config();
const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const { validate } = require("joi");

const Joi = require("joi");

const User = require('./models/User');

var corsOptions = {
    origin: "*",
};

mongoose.connect(process.env.MONGO_CONNECTION_URL)

const app = express()
app.use(express.json())
app.use(cors(corsOptions));

require("./routes/authRoute")(app);

const registerSchema = Joi.object({
    username: Joi.string().min(4).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
}).options({ abortEarly: false });


app.post("/register", async (req, res) => {


    const { error } = registerSchema.validate(req.body);

    if (error) {
        const errorDetails = error.details.map((err) => ({
            field: err.context.key,
            message: err.message,
        }));
        return res.status(400).json({ errors: errorDetails });
    }

    const { username, email, password } = req.body;

    const userDoc = await User.create({
        username, email, password
    });

    console.log("user created")

    res.json({
        "message": "success",
        "user": userDoc
    })
});

app.listen(8080);

