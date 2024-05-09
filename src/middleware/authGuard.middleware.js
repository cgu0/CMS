const { validate } = require("../models/user.model");

module.exports = (req, res, next) => {
    const authorization = req.header("Authorization");
    if (!authorization) {
        return res.formatResponse("Missing authroization token", 401);
    }
    const [type, token] = authorization.split(" ");
    if (type !== "Bearer" || !token) {
        return res.formatResponse("Invalid token type", 401);
    }

    const payload = validate(token)
    if (!payload) {
        return res.formatResponse("Invalid token", 401);
    }
    // req.user = payload;
    next();       
}