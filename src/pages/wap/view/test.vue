<template>
  <div>
    <child>
      <span class="l-span2">添加跟进</span>
    </child>
    <div id="box" @click="weixin()">测试</div>
  </div>
</template>

<script>
import Child from "../common/header.vue";
export default {
  data() {
    return {
      indexList: ["一", "二", "三", "四", "五", "六"],
    };
  },
  components: {
    child: Child,
  },
  mounted() {},
  methods: {
    weixin() {
      var url = window.location.href;
      var env = process.env.NODE_ENV;
      if (env == "development") {
        //开发环境
        var host_ = "/weixinsdk";
        console.log("开发环境");
      } else if (env == "production") {
        //上线环境
        var host_ = "https://www.dstyao.com";
        console.log("上线环境");
      }
      $.ajax({
        type: "get",
        url: host_ + "/qy_weixin/jssdk-qy.php?url=" + encodeURIComponent(url), //替换网址，xxx根据自己jssdk文件位置修改
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
          alert(data);
          wx.config({
            beta: true, //必须这么写，否则wx.invoke调用形式的jsapi会有问题
            // debug: true, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "getContext",
              "sendChatMessage", //发送消息
              "launchMiniprogram", //跳转小程序
            ],
          });
          wx.ready(function () {
            wx.agentConfig({
              // debug: true,
              corpid: data.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
              agentid: "1000015", // 必填，企业微信的应用id （e.g. 1000247）
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名，见附录-JS-SDK使用权限签名算法
              jsApiList: [
                "sendChatMessage",
                "launchMiniprogram", //跳转小程序
              ], //必填
              success: function (res) {
                // alert("成功-====");
                // alert(JSON.stringify(res));
              },
              fail: function (err) {
                // var a = {
                //   timestamp: data.timestamp,
                //   nonceStr: data.nonceStr,
                // };
                // var b = {
                //   signature: data.signature,
                // };
                // alert("失败=====");
                // alert(JSON.stringify(a));
                // alert(JSON.stringify(b));
                // alert(JSON.stringify(err));
              },
            });
          });
        },
        error: function (data) {
          console.log(data);
        },
      });
    },
  },
};
</script>

<style>
#box {
  width: 100px;
  height: 100px;
  position: fixed;
  background-color: blue;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
</style>