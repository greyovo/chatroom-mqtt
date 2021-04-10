var mqtt = require("mqtt");

// 连接选项
const options = {
  clean: true, // true: 清除会话, false: 保留会话
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: "admin",
  username: "admin",
  password: "public",
};

const connectUrl = "mqtt://centos:1883";
const client = mqtt.connect(connectUrl, options);

client.on("connect", function () {
  console.log("> connected to mqtt!");
  client.subscribe("testtopic", function (err) {});
});

client.on("reconnect", (error) => {
  console.log("正在重连:", error);
});

client.on("error", (error) => {
  console.log("连接失败:", error);
});

client.on("message", (topic, message) => {
  console.log("收到消息：", message.toString());
});
