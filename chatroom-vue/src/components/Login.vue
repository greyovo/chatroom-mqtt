<template>
  <div>
    <el-row type="flex" justify="center">
      <el-form
        :model="user"
        label-width="80px"
        :rules="rules"
        status-icon
        ref="loginForm"
      >
        <!-- `ref=` 相当于对这个组件起别名，方便在js中引用，引用方法this.$refs.loginForm -->
        <el-form-item label="用户名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="pass">
          <el-input v-model="user.pass" type="password"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-upload" @click="login">
            登录
          </el-button>
          <el-button @click="toMain">
            去首页
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {},
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },

  mounted() {

  },

  methods: {
    toMain() {
      this.$router.replace("/");
    },

    login() {
      this.$refs.loginForm.validate(valid => {
        // 使用element ui的校验器检查表单数据项的合法性
        if (valid) {
          // 验证用户名和密码
          if (this.user.name) {
            // dispatch采用Promise链式调用
            this.$store.dispatch("login", this.user).then(() => {
              // 这里的notify也是element ui提供的方法
              this.$notify({
                type: "success",
                message: "欢迎你，" + this.user.name + "!",
                duration: 3000
              });
              this.$router.replace("/");
            });
          } else {
            // 这里的message是element ui提供的方法
            this.$message({
              type: "error",
              message: "用户名或密码错误！",
              showClose: true
            });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
