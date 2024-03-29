const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let errorResponse = {
    path: req.originalUrl,
    time: new Date(),
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, try again later",
  };
  console.log(err.name);

  if (err.name == "ValidationError") {
    console.log(err.errors);
    errorResponse.validationErrors = err.errors;
  }

  return res.status(errorResponse.statusCode).json(errorResponse);
};

module.exports = {
  errorHandlerMiddleware,
};
