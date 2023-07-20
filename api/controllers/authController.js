const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/jwtUtil");
const { registerSchema } = require("../schema/dtoValidationSchemas");
const User = require("../models/User");
const ValidationError = require('../errors/validationError');
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
        throw new ValidationError("wrong credentials!");
        // throw new Error("wrong credentials!");
    }

    const token = generateToken({ username, id: userDoc._id });
    res.json({
        user: userDoc,
        accessToken: token,
    });
};

exports.register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        const errorDetails = error.details.map((err) => ({
            field: err.context.key,
            message: err.message,
        }));
        throw new ValidationError("Validation error!", errorDetails);
        // return res.status(400).json({ errors: errorDetails });s
    }

    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log("User created");

    res.json({
        message: "Success",
        user: userDoc,
    });

};
