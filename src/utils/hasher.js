const scrypt = require("scrypt-async");

const config = require("../config");

function hash(password) {
  return new Promise((resolve, reject) => {
    scrypt(
      password,
      config.SCRYPTSALT,
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
