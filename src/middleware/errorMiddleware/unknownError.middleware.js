const config = require("../../config");
const getLogger = require("../../common/logger");

const logger = getLogger(__filename);

module.exports = (error, req, res, next) => {
  logger.error(`${error.message}\n stacks: ${error.stack}`);

  res.formatResponse(
    `Something went wrong, please try again later`,
    500,
    config.NODE_ENV === "dev"
      ? {stack: error.stack }
      : {}
  );
};
