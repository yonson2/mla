require("dotenv").config();

const Koa = require("koa");
const koajwt = require("koa-jwt");
const mount = require("koa-mount");

const router = require("./routes/router");
const config = require("./config");

const v1 = new Koa();

require("./config/db");

// JWT
v1.use(
  koajwt({ secret: process.env.JWTSALT }).unless({
    path: [/^\/v1\/login/, /^\/v1\/league\/?$/]
  })
);

// Load routes
v1.use(router.routes());
v1.use(router.allowedMethods());

// Initiate server
console.log(`Starting server on port ${config.app.port}`);

const app = new Koa();

app.use(mount("/v1", v1));
app.listen(config.app.port);

module.exports = app;
