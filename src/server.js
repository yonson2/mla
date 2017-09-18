const db = require("sqlite");
const Koa = require("koa");
const koajwt = require("koa-jwt");
const mount = require("koa-mount");

const router = require("./router");
const config = require("./config");

const v1 = new Koa();

require("./config/db");

// JWT
// Using passthrough because most of the endpoints don't need auth
// check ctx.state.user to see if the request is authenticated
// could also use .unless({ path: [/^\/public/] }) instead
v1.use(koajwt({ secret: config.JWTSALT, passthrough: true }));

// Load routes
v1.use(router.routes());
v1.use(router.allowedMethods());

// Initiate server
console.log(`Starting server on port ${config.app.port}`);

const app = new Koa();

app.use(mount("/v1", v1));
app.listen(config.app.port);

module.exports = app;

// Catch SIGNIT and perform cleanup
process.on("SIGINT", function() {
  console.log("\nClosing database");
  db
    .close()
    .then(() => console.log("Database closed"))
    .then(() => process.exit());
});
