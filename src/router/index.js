const Router = require("koa-router");
const koaBody = require("koa-body")();

const login = require("./login");
const createLeague = require("./create-league");

const router = new Router();

router.get("/", home);
router.post("/login", koaBody, login);
router.post("/league", koaBody, createLeague);

// if the user is logged in the object ctx.state.user will be initialised
function home(ctx, next) {
  ctx.body = "MLA API";
}

module.exports = router;
