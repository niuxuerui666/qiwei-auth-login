import axios from "axios";
import { Notify } from "vant";
import router from "../router/router.js";

const service = axios.create({
  // process.env.NODE_ENV === 'development' 来判断是否开发环境
  // easy-mock服务挂了，暂时不使用了
  // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      router.push({ path: "/401" });
    } else {
      Promise.reject();
    }
  },
  (error) => {
    console.log(error);
    if (error.toString().indexOf("Error: timeout") !== -1) {
      // 危险通知
      Notify({ type: "danger", message: "网络连接超时，请稍后重试~" });
      router.push({ path: "/500" });
    }
    return Promise.reject();
  }
);

export default service;
