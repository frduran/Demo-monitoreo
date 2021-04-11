const koa = require("koa");
const koaRouter = require("koa-router");
const render = require("koa-ejs");
const path = require("path");
const app = new koa();
const bodyparser = require("koa-bodyparser");

app.use(bodyparser());

const router = new koaRouter();
const countries = ["INDIA", "CHILE", "USA"];
render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx) => {
  await ctx.render("index", {
    title: "Países que amo",
    countries: countries,
  });
});

router.get("/addcountry", async (ctx) => {
  await ctx.render("add");
});

router.post("/addcountry", add);

async function add(ctx) {
  const body = ctx.request.body;
  const country = body.country;
  countries.push(country);
  ctx.redirect("/");
}

app.use(async (ctx) => (ctx.body = "hello world"));

module.exports = app;
