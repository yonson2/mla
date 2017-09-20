require("dotenv").config();
require("./db");

const Rollbar = require("rollbar");
const rollbar = new Rollbar(process.env.ROLLBAR_TOKEN);

if (process.env.NODE_ENV === "production") {
  console.log = (...args) => rollbar.info.call(rollbar, ...args);
  console.info = (...args) => rollbar.info.call(rollbar, ...args);
  console.warn = (...args) => rollbar.warn.call(rollbar, ...args);
  console.error = (...args) => rollbar.error.call(rollbar, ...args);
  console.debug = (...args) => rollbar.debug.call(rollbar, ...args);
}
