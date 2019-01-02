const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const dbConfig = require("./config").db;
const router = require("./routes/index");
const {
  query
} = require("./utils/db");
const socketModel = require("./models/soketHander");
const app = new Koa();
const mount = require('koa-mount')
const static = require('koa-static')
const path = require('path')

/* ===========  静态文件处理 start  ======================== */
const public = new Koa()
public.use(static(path.join(__dirname, 'static')))
app.use(mount('/static', public))
/* ===========  静态文件处理 end  ======================== */

// const server = require('http').Server(app.callback());
// const io = require('socket.io')(server);
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);
// io.on('connection', function(){ /* … */ });
server.listen(3000);

/* ===========  跨域处理 start  ======================== */
app.use(cors({
  origin: (ctx) => {
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  await next()
})
/* ===========  跨域处理 end  ======================== */

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

global.query = query;

/* ===========  聊天相关 start  ======================== */
io.on("connection", socket => {
  const socketId = socket.id;
  //登录
  socket.on("login", async userId => {
    await socketModel.saveUserSocketId(userId, socketId);
  });
  // 更新soketId
  socket.on("update", async userId => {
    await socketModel.saveUserSocketId(userId, socketId);
  });
  //私聊
  socket.on("sendPrivateMsg", async data => {
    const arr = await socketModel.getUserSocketId(data.to_user);
    const RowDataPacket = arr[0];
    const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
    io.to(socketid).emit("getPrivateMsg", data);
  });
  // 群聊
  socket.on("sendGroupMsg", async data => {
    io.sockets.emit("getGroupMsg", data);
  });

  //加好友请求
  socket.on("sendRequest", async data => {
    console.log("sendRequest", data);
    const arr = await socketModel.getUserSocketId(data.to_user);
    const RowDataPacket = arr[0];
    const socketid = JSON.parse(JSON.stringify(RowDataPacket)).socketid;
    console.log('给谁的socketid', socketid)
    io.to(socketid).emit("getresponse", data);
  });

  socket.on("disconnect", data => {
    console.log("disconnect", data);
  });
});
/* ===========  聊天相关 end  ======================== */
// app.listen(3000);
console.log("服务器已启动,端口3000");

module.exports = app
