const axios = require("axios");
const qs = require("query-string");
const baseUrl =  "https://cnodejs.org/api/v1";

module.exports =  async (ctx, next) => {
  const reqBody = ctx.request.body;
  const path = ctx.path;
  const user = ctx.session.user || {};
  const needAccessToken = ctx.query.needAccessToken;
  // 判断传输过来的请求是否需要token 判断用户是否登录 
  if( needAccessToken && !user.accessToken){
    ctx.body = {
      success: false,
      mes: "need login"
    }
  }else{
    const query = ctx.query;
    if (query.needAccessToken) delete query.needAccessToken;
    const res = await  axios({
      url: `${baseUrl}${path}`,
      method: ctx.method,
      params: Object.assign({}, query, { 
        accesstoken: user.accessToken 
      }),
      data: qs.stringify(Object.assign({}, reqBody, {
        accesstoken: user.accessToken
      })),
      headers: {
        "Content-Type": "application/x-www-urlencoded"
      }
    })
    if(res.status ===200 && res.data.success){
      ctx.body = res.data;
    }else{
      ctx.status = res.status;
      ctx.body = "res.data";
    }
  }
}