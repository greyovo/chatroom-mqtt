<template>
  <el-container>
    <el-header class="header" height>
      <h2>聊天室 / Chatroom</h2>
      <p>由 EMQX & MongoDB 驱动</p>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.header {
  background-color: #0078d7;
  color: white;
}
</style>
