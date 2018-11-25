const Router = require("koa-router");
const handleRoute = require("./index.js");

const route = new Router();

route.post("/message/mark_all", handleRoute)

module.exports = route;