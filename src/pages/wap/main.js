import Vue from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import store from "./store/index";
import "amfe-flexible";
import Vant from "vant";
import "vant/lib/index.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import md5 from "js-md5";
import axios from "axios";
import Auth from "./utils/isLogin.js";

Vue.config.productionTip = false;

Vue.use(Vant);
Vue.prototype.$md5 = md5;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 判断用户是否处于登录状态
  //toke判断放在了isLoin里
  let flag = Auth.hasCode();

  console.log("获取？？", flag);

  if (Auth.hasCode()) {
    // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
    // 这种情况出现在手动修改地址栏地址时

    if (to.path === "/login") {
      next();
      // next({path: "/defaultText",replace: true})
    } else if (to.path.indexOf("/500") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/404") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/403") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/401") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else {
      // initRoute().then(() => {
      //   let isPermission = false;
      //   // console.log("对比权限的列表", permissionList)
      //   for (var ii = 0; ii < permissionList.length; ii++) {
      //     var index = "/" + permissionList[ii].index;
      //     if (index == to.fullPath) {
      //       isPermission = true;
      //       break;
      //     }
      //   }
      //   //没有权限时跳转到403页面
      //   if (!isPermission) {
      //     next({ path: "/403", replace: true });
      //   } else {
      //     next();
      //   }
      // });
      next();
      // next();
    }
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    // if (whiteList.indexOf(to.path) >= 0) {
    //   console.log("该页面无需登录即可访问");
    //   next();
    // } else {
    //   console.log("当前未处于登录状态，请登录");
    //   next({ path: "/login", replace: true });
    // }

    if (to.path.indexOf("/500") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/404") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/403") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else if (to.path.indexOf("/401") >= 0) {
      // 防止因重定向到error页面造成beforeEach死循环
      next();
    } else {
      //没有获得权限
      // next({ path: "/401", replace: true });

      next()
      
        //获得权限
        // next({ path: "/CommodityCenter", replace: true });

      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww79d00567ef8a3029&redirect_uri=${window.encodeURIComponent(
      //   "https://foreign-test.111yao.cn:8443/autopage/wap.html#/CommodityCenter"
      // )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      // return
    }
    // next();
    // next({ path: "/500", replace: true });
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
