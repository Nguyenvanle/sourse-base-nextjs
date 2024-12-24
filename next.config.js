// next.config.js
const envConfig = require("./env-config.js");

const appEnv = process.env.APP_ENV || "development";
const currentEnvConfig = envConfig[appEnv];

module.exports = {
  env: {
    ...currentEnvConfig,
  },
};
