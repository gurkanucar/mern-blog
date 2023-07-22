const bcrypt = require("bcryptjs");
const { generateToken } = require("../util/jwtUtil");
const { registerSchema } = require("../schema/dtoValidationSchemas");
const User = require("../models/User");
const ValidationError = require("../errors/validationError");
const CustomError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");
const { findRoleByNameCore } = require("./roleController");

exports.login = async (req, res) => {
  const { username: reqUsername, password: reqPassword } = req.body;


  console.log(reqUsername, reqPassword)

  const userDoc = await User.findOne({ username: reqUsername })
    .populate({
      path: "roles",
      select: { name: 1, _id: 0 },
    })
    .select("-entries");


  if (!userDoc || !bcrypt.compareSync(reqPassword, userDoc.password)) {
    throw new CustomError("Wrong credentials!", StatusCodes.UNAUTHORIZED);
  }

  const { password, ...userWithoutPassword } = userDoc.toObject();

  const token = generateToken({ username: userDoc.username, id: userDoc._id, roles: userDoc.roles });
  res.json({
    user: userWithoutPassword,
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
