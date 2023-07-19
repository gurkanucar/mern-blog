const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/jwtUtil");
const { registerSchema } = require("../schema/dtoValidationSchemas");
const User = require("../models/User");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userDoc = await User.findOne({ username });

        if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
            return res.status(401).json({
                message: "Wrong credentials!",
            });
        }

        const token = generateToken({ username, id: userDoc._id });
        res.json({
            user: userDoc,
            accessToken: token,
        });
    } catch (e) {
        res.status(401).json({
            message: "Wrong credentials!",
        });
    }
};

exports.register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        const errorDetails = error.details.map((err) => ({
            field: err.context.key,
            message: err.message,
        }));
        return res.status(400).json({ errors: errorDetails });
    }

    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
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
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};
