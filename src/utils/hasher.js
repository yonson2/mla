const scrypt = require("scrypt-async");

function hash(password) {
  return new Promise((resolve /*, reject*/) => {
    scrypt(
      password,
      process.env.SCRYPTSALT,
      {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: 32,
        encoding: "hex"
      },
      function(derivedKey) {
        resolve(derivedKey);
      }
    );
  });
}

module.exports = hash;
