const config = require("../config");

function login(ctx) {
  // TODO: password check
  const password = ctx.request.body.password;
  if (password === "test") {
    const token = jwt.sign({ foo: "bar" }, config.JWTSALT);
    ctx.body = token;
  } else {
    ctx.body = "Invalid credentials";
    ctx.status = 401;
  }
}

module.exports = login;
