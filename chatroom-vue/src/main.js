import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 引入路由配置
import store from "./vuex"; // 引入路由配置
import "./axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; // 要引入这个css才能使样式生效

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
