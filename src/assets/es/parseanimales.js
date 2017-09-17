const fs = require("fs");

const rawfemenino = fs.readFileSync("rawanimals.f.es", "utf8");
const rawmasculino = fs.readFileSync("rawanimals.m.es", "utf8");

console.log(rawfemenino);
const femenino = rawfemenino.split(/\r?\n/);
const masculino = rawmasculino.split(/\r?\n/);

fs.writeFileSync(
  "animals.m.json",
  JSON.stringify({ animals: masculino }, null, " ")
);

fs.writeFileSync(
  "animals.f.json",
  JSON.stringify({ animals: femenino }, null, " ")
);
