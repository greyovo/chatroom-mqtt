# 服务端

## 安装依赖

```shell
npm i
```

## 修改 MQTT 配置项

在`socketServer.js`配置相关参数

配置项包括：

- 你的 MQTT 服务地址和端口
- AppID
- AppSecret
- Topic
- 服务器监听端口

默认开启所有沾点跨域允许

## 启动服务器

监听端口 3001，可在`socketServer.js`中修改

```shell
node socketServer.js
```
