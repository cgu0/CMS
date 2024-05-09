const jwt = require('jsonwebtoken');
const config = require('../../config');
const getLogger = require('../logger');
const logger = getLogger(__filename);
const secret = config.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
}

const verifyToken = (token) => {
    try {
        const payload  = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};