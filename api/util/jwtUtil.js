const jwt = require("jsonwebtoken");
const UnAuthorizedError = require("../errors/unAuthorizedError");
const jwt_secret = "myjwtsecret";


const validateToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, jwt_secret);
    return decodedToken;
  } catch (err) {
    throw new UnAuthorizedError("Invalid token!");
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: "20h" });
};

module.exports = {
  generateToken, validateToken
};
