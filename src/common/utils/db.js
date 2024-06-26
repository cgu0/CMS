const mongoose = require("mongoose");
const config = require("../../config");
const getLogger = require("../logger");
const logger = getLogger(__filename);

const connectToDB = async () => {
  const db = mongoose.connection;
  db.on("error", (error) => {
    logger.error(error);
    throw new Error(error);
  });
  db.on('connected',()=>{
    logger.info('connected to db');
  })
  db.on('disconnect',()=>{
    logger.warn('DB disconnected');
  })
  return mongoose.connect(config.DB_CONNECTION_STRING);
};

module.exports = connectToDB;