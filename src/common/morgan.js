const { config } = require("dotenv");
const morgan = require("morgan");
const getLogger = require("./logger");


const logger = getLogger()
module.exports = morgan(config.NODE_ENV === "dev" ? "dev" : "combined", {
    stream: logger.stream
})