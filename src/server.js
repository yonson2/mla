const db = require("sqlite");
const Koa = require("koa");
const jwt = require("koa-jwt");
const app = new Koa();

const router = require("./router");
const config = require("./config");

require("./config/db");

// JWT
// Using passthrough because most of the endpoints don't need auth
// check ctx.state.user to see if the request is authenticated
// could also use .unless({ path: [/^\/public/] }) instead
app.use(jwt({ secret: config.JWTSALT, passthrough: true }));

// Load routes
app.use(router.routes());
app.use(router.allowedMethods());

// Initiate server
console.log(`Starting server on port ${config.app.port}`);
app.listen(config.app.port);

// Catch SIGNIT and perform cleanup
process.on("SIGINT", function() {
  console.log("\nClosing database");
  db
    .close()
    .then(() => console.log("Database closed"))
    .then(() => process.exit());
});

module.exports = app;
