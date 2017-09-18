const db = require("sqlite");
const path = require("path");

Promise.resolve()
  // First, try connect to the database
  .then(() => db.open(path.join(__dirname, "db.sqlite") /* , { Promise }*/))
  .then(() => db.migrate({ force: "last" }))
  .catch(err => console.error(err.stack))
  // Finally, launch Node.js app
  .then(() => console.log("Connected"));
