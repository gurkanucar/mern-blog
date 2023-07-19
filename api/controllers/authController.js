
const { validate } = require("joi");
const Joi = require("joi");
const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10);




const User = require('../models/User');




exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userDoc = await User.findOne({ username })

    res.json({
        "message": "success",
        "user": userDoc
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

    let { username, email, password } = req.body;

    password = bcrypt.hashSync(password, salt)

    const userDoc = await User.create({
        username, email, password
    });

    console.log("user created")

    res.json({
        "message": "success",
        "user": userDoc
    })
}