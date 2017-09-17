const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const scrypt = require("scrypt-async");

const envPath = path.join(__dirname, "../", "../", ".env");
const buf = fs.readFileSync(envPath);
const config = dotenv.parse(buf); // will return an object

function hash(password) {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      config.SALT,
      {
        N: 16384 * 2,
        r: 16,
        p: 1,
        dkLen: 64,
        encoding: "hex"
      },
      function(derivedKey) {
        resolve(derivedKey);
      }
    );
  });
}

module.exports = hash;
