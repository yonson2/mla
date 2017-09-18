const Koa = require("koa");
const jwt = require("koa-jwt");
const app = new Koa();

const router = require("./src/router");
const config = require("./src/config");

// JWT
// Using passthrough because most of the endpoints don't need auth
// check ctx.state.user to see if the request is authenticated
// could also use .unless({ path: [/^\/public/] }) instead
app.use(jwt({ secret: config.JWTSALT, passthrough: true }));

// Load routes
app.use(router.routes());
app.use(router.allowedMethods());

// Initiate server
app.listen(3456);
