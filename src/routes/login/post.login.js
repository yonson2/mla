const jwt = require("jsonwebtoken");
const hash = require("../../utils/hasher");
const leagueService = require("../league/league.service");

async function login(ctx) {
  try {
    const hashedPassword = await hash(ctx.request.body.password);
    const plainPassword = ctx.request.body.password;
    const league = await leagueService.getByName(ctx.request.body.league);

    let token;

    switch (true) {
      case league.length === 0:
      case hashedPassword !== league[0].password &&
        plainPassword !== league[0].user_password:
        ctx.body = "Invalid credentials";
        ctx.status = 401;
        break;
      case hashedPassword === league[0].password:
        token = jwt.sign(
          { scope: "admin", name: league[0].name },
          process.env.JWTSALT
        );
        ctx.body = token;
        break;
      case plainPassword === league[0].user_password:
        token = jwt.sign(
          { scope: "user", name: league[0].name },
          process.env.JWTSALT
        );
        ctx.body = token;
    }
  } catch (err) {
    console.error(err.message, err.stackTrace, err);
    ctx.body = "Internal Server Error";
    ctx.status = 500;
  }
}

module.exports = login;
