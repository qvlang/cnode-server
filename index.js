const Koa = require("koa");
const registerRoute = require("./api/index.js");
const bodyParser = require("koa-body");
const session = require("koa-session");

const app = new Koa();
//设置一个全局异常捕获中间件
const handleErr = async (ctx,next)=>{
  try{
    ctx.set({
      "Access-Control-Allow-Origin": "http://localhost:8080",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers": "Origin,No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Max-Age": "3600"
    });
    await next()
  }catch(err){
    ctx.status = err.response.statusCode || err.response.status || 500;
    ctx.body = {
      message: err.message
    };
  }
};

app.keys = ["vue cnode serve"]
const CONFIG = {
  key: "koa:sess",
  maxAge: 10 * 60 * 1000,
  renew: false,
  rolling: false
}
app.use(handleErr);
app.use(session(CONFIG, app));
app.use(bodyParser());
app.use(registerRoute());
app.use(async (ctx)=> {
  ctx.body = "hello world";
});

app.listen(3333);
console.log("the server is runing");