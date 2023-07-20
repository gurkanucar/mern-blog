const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
        this.errors = errors;
        this.name = 'ValidationError';
    }
}

module.exports = ValidationError;
