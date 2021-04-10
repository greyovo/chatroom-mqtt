import axios from "axios";
import Vue from "vue";

// axios.defaults.baseURL = "http://centos:8081";
axios.defaults.auth = {
  username: "admin",
  password: "public"
};
Vue.prototype.$ajax = axios;
