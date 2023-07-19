
const { validate } = require("joi");
const Joi = require("joi");

const User = require('../models/User');




exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({
        "message": "success"
    })
}


exports.register = async (req, res) => {

    const registerSchema = Joi.object({
        username: Joi.string().min(4).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }).options({ abortEarly: false });

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
}