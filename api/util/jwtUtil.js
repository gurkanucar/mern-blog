const jwt = require("jsonwebtoken");
const jwt_secret = "myjwtsecret";

const generateToken = (payload) => {
    return jwt.sign(payload, jwt_secret, {});
}

module.exports = {
    generateToken,
};
