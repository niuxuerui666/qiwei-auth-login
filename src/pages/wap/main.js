import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from './store/index';
import 'amfe-flexible';
import Vant from 'vant';
import 'vant/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
import axios from "axios";

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");