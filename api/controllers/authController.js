const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/jwtUtil");
const { registerSchema } = require("../schema/dtoValidationSchemas");
const User = require("../models/User");
const ValidationError = require('../errors/validationError');
const CustomError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");
const { findRoleByNameCore } = require("./roleController");


exports.login = async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
        throw new CustomError("Wrong credentials!", StatusCodes.UNAUTHORIZED);
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
    }

    const role = await findRoleByNameCore("USER");
    console.log("ROLE", role);

    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userDoc = await User.create({
        username,
        email,
        password: hashedPassword,
        roles: [role._id],
    });

    console.log("User created");

    res.json({
        message: "Success",
        user: userDoc,
    });

};
