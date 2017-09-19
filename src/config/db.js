const db = require("sqlite");
const path = require("path");

const config = require(".");

const force = config.NODE_ENV === "PRODUCTION" ? "false" : "last";

function connectDB() {
  return (
    Promise.resolve()
      // First, try connect to the database
      .then(() => db.open(path.join(__dirname, "db.sqlite") /* , { Promise }*/))
      .then(() => db.migrate({ force }))
      .catch(err => console.error(err.stack))
      .then(() => console.log("Connected to SQLite"))
  );
}

// Catch SIGNIT and perform cleanup
process.on("SIGINT", function() {
  console.log("\nClosing database");
  db
    .close()
    .then(() => console.log("Database closed"))
    .then(() => process.exit());
});

connectDB();
