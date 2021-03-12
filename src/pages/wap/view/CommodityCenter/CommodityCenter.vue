<template>
  <div class="home">
    <div>请求参数：{{ theRequest }}</div>
    <div>当前人信息：{{ userObj }}</div>
  </div>
</template>

<script>
import { reqNowLoginUser } from "../../api/index.js";
import Cookies from "js-cookie";
import Clipboard from "clipboard";
import { Notify, Dialog } from "vant";
import utils from "../../utils/utils.js";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return { theRequest: {}, userObj: {} };
  },
  created() {
    console.log("window.location66666", window.location);

    var Request = {};
    Request = this.GetRequest();

    this.theRequest = { ...Request };

    if (this.theRequest.code && this.theRequest.state) {
      this.reqNowLoginUser();
    }
  },
  methods: {
    reqNowLoginUser() {
      let query = {
        code: this.theRequest.code ? this.theRequest.code : "",
        state: this.theRequest.state ? this.theRequest.state : "",
      };
      reqNowLoginUser(query)
        .then((res) => {
          if (res.code === 0) {
            this.userObj = { ...res.data };

            Cookies.set("code", JSON.stringify(this.userObj),{expires:7});
          }
        })
        .catch((err) => {
          this.userObj = { ...err };
        });
    },

    autoLogin() {
      alert("开始111");

      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww79d00567ef8a3029&redirect_uri=${window.encodeURIComponent(
        "https://foreign-test.111yao.cn:8443/autopage/wap.html#/CommodityCenter"
      )}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;

      console.log("window.location.", window.location);

      return;

      // this.pageUrl = "";

      // this.$axios({
      //   headers: {
      //     "Content-Type": "application/json;charset=utf-8",
      //   },
      //   url:
      //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww79d00567ef8a3029&redirect_uri=https%3a%2f%2fforeign-test.111yao.cn%3a8443%2fwecom%2fafter%2fauth%2fquery&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect",

      //   method: "get",
      //   params: {},
      // })
      //   .then((res) => {
      //     alert("成功");
      //     alert(JSON.stringify(res));
      //   })
      //   .catch((err) => {
      //     console.log(JSON.stringify(err));
      //     alert(JSON.stringify(err));

      //     alert("失败");
      //   });
    },

    GetRequest() {
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();

      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        let strs = [];
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }

      console.log(theRequest);

      return theRequest;
    },
  },
};
</script>

<style lang="scss" scoped></style>
