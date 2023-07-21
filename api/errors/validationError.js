const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class ValidationError extends CustomError {
  constructor(message, errors) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.errors = errors;
    this.name = "ValidationError";
  }
}

module.exports = ValidationError;
