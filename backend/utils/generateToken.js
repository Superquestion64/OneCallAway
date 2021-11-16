//Generate a valid jwt token for 4 hours
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "4h",
    });
};

module.exports = generateToken;