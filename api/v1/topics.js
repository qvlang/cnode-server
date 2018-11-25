const Router = require("koa-router");
const route = new Router();
const axios = require("axios");

const baseUrl =  "https://cnodejs.org/api/v1";
route.get("/topics", async (ctx) =>{
  const res = await axios.get(`${baseUrl}/topics`);
  ctx.body = res.data
});

module.exports = route;