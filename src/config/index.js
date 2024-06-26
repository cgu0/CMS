require('dotenv').config();

const optionalConfig = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'dev',

};

const requiredConfig = {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
}

for (const key in requiredConfig) {
   if (requiredConfig[key] == null) {
       throw new Error(`Missing value for ${key}`);
   }
}

module.exports = {
    ...optionalConfig,
    ...requiredConfig,
}