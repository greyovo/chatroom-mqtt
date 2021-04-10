<template>
  <div>
    <!-- <el-button type="success" @click="mqttPub">MQTT 发布</el-button>
      <el-button type="success" @click="mqttSub">MQTT 订阅</el-button> -->
    <!-- <el-button type="success" @click="axioTest">axioTest API测试</el-button> -->

    <!-- 没有登录 -->
    <div v-if="!user">
      <h1 style="margin-bottom:20px">你还没有登录。</h1>
      <el-button type="success" @click="login">点击登录</el-button>
    </div>

    <!-- 已登录 -->
    <div v-else>
      <div>
        欢迎你，{{ user.name }}
        <el-button
          style="margin-left:20px"
          size="mini"
          type="plain"
          @click="logout"
          >注销</el-button
        >
      </div>
    </div>

    <div class="fixed-bottom" v-if="user">
      <!-- 展示接收到的消息 -->
      <div style="margin-top:20px">
        <div style="margin-top:10px" v-for="item in all" :key="item">
          <div>{{ item }}</div>
        </div>
      </div>
      <el-input style="margin-top:20px" @keyup.enter.native="sendMsg" v-model="inputMsg"></el-input>
      <el-button style="margin-top:20px" @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script>
let io = require("socket.io-client");
let socket = io("ws://172.16.110.200:3001"); // 建立链接

export default {
  data() {
    return {
      all: [],
      inputMsg: ""
    };
  },

  created() {},

  mounted() {
    // 此时会触发后台的connect事件
    socket.on("msg", data => {
      // 监听服务端的消息msg
      var uint8array = new Uint8Array(data);
      var str = new TextDecoder("utf-8").decode(uint8array);
      console.log(str);
      data = JSON.parse(str);
      let show = data.username + ": " + data.content;
      this.all.push(show);
    });

    socket.emit("username", this.user.name);
  },

  methods: {
    /**
     * 登录
     */
    login() {
      this.$router.replace("/login");
    },

    /**
     * 登出
     */
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace("/");
      });
    },

    sendMsg() {
      if (this.inputMsg.trim() === "") {
        return;
      }
      let msg = {
        username: this.user.name,
        content: this.inputMsg
      };
      console.log(msg);
      // this.all.push(this.username + " said: " + this.inputMsg);
      try {
        socket.emit("msg", JSON.stringify(msg));
        this.$message(this.inputMsg);
      } catch (error) {
        this.$notify(error);
      }
      this.inputMsg = "";
    },

    axioTest() {
      this.$ajax
        .get("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => (this.info = response));
    }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
.fixed-bottom {
  position: absolute;
  bottom: 30px;
}
</style>
