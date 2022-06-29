const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const key = process.env.SECRET_KEY

function generateToken(payload) {
    return jwt.sign(payload, key)
}

function verifyToken(token) {
    return jwt.verify(token, key)
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
}