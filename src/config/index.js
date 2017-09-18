const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const envPath = path.join(__dirname, "../", "../", ".env");
const buf = fs.readFileSync(envPath);
const env = dotenv.parse(buf); // will return an object

const config = {};

module.exports = Object.assign({}, config, env);
