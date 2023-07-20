const { StatusCodes } = require('http-status-codes');

class CustomError extends Error {
    constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = CustomError;
