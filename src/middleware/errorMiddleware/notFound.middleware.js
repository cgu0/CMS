const NotFoundException = require("../../common/exceptions/notFound.exception");

module.exports = (error, req, res, next) => {
    if (error instanceof NotFoundException) {
      return res.formatResponse(error.message, 400);
    }
    next(error);
  };
  