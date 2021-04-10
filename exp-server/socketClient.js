const io = require("socket.io-client");
const socket = io("ws://127.0.0.1:3001"); // 建立链接
const username = Date.now() + "";

// 接收信息
socket.on("msg", function (data) {
  // 监听服务端的消息“msg”
  data = JSON.parse(data);
  console.log(data.username + " said: " + data.content);
});

// 发送信息
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("请开始输入");
socket.emit("username", username);
rl.on("line", (res) => {
  let msg = {
    username: username,
    content: res,
  };
  socket.emit("msg", JSON.stringify(msg));
});
