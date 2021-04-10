let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io")(server, { cors: true });
let mqtt = require("mqtt");

const port = 3001;

app.all('*', function (req, res, next) {
  // 设置全局的全域问题，我这里是把所有的全部允许了，
  // 如果不怕麻烦或者业务需求，你也可以在请求里面写对应的跨域问题
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 连接选项
const mqttOptions = {
  clean: true, // true: 清除会话, false: 保留会话
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: "admin",
  username: "admin",
  password: "public",
};

/**
 * 初始化mqtt服务连接
 */
const connectUrl = "mqtt://centos:1883";
const client = mqtt.connect(connectUrl, mqttOptions);
const TOPIC = "testtopic";

client.on("connect", function () {
  console.log("> connected to mqtt!");
  client.subscribe(TOPIC, function (err) {});
});

client.on("reconnect", (error) => {
  console.log("正在重连:", error);
});

client.on("error", (error) => {
  console.log("连接失败:", error);
});

client.on("message", (topic, message) => {
  io.emit("msg", message);
});

/**
 * WebSocket 连接
 */
let username = "";
let that = this;
io.on("connection", function (socket) {
  
  // socket相关监听都要放在这个回调里
  socket.on("disconnect", function () {
    console.log("> user [" + username + "] go out");
  });

  // 从客户端接受topic为msg的消息
  socket.on("msg", (msg) => {
    console.log("message: " + msg);
    client.publish(TOPIC, msg);
  });

  socket.on("username", (name) => {
    username = name;
    console.log("> user [" + name + "] connected");
  });
});

//开启端口监听socket
server.listen(port);
console.log("> Connection established. \n> Listening at port " + port + ".");
