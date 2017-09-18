const Router = require("koa-router");
const koaBody = require("koa-body")();

const login = require("./login");

const router = new Router();

router.get("/", home);
router.post("/login", koaBody, login);

// if the user is logged in the object ctx.state.user will be initialised
function home(ctx, next) {
  ctx.body = "<strong>MLA API</strong>";
}

module.exports = router;
