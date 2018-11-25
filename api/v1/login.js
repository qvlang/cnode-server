const Router = require("koa-router");
const route = new Router();
const axios = require("axios");
const qs = require("query-string");

const baseUrl =  "https://cnodejs.org/api/v1";
route.post("/login", async (ctx) =>{
  const resBody = ctx.request.body;
  const res = await axios.post(`${baseUrl}/accesstoken`,{
    accesstoken: resBody.accessToken
  });
  if(res.data.success) {
    ctx.session.user = {
      accessToken: resBody.accessToken,
      loginName: res.data.loginname,
      id: res.data.id,
      avatarUrl: res.data.avatar_url
    }
  }
  ctx.body = {
    success: true,
    data: res.data,
    session: ctx.session
  }
});

module.exports = route;