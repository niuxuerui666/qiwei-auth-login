<template>
  <div class="active">
    <loading></loading>
  </div>
</template>

<script>
import { Notify, Dialog } from "vant";
import loading from "../loading/loading";
export default {
  created() {
    this.weixin();
  },
  components: {
    loading,
  },
  methods: {
    weixin() {
      var url = window.location.href;
      var env = process.env.NODE_ENV;
      var that = this;
      var host_ = null;
      if (env == "development") {
        //开发环境
        host_ = "/weixinsdk";
        console.log("开发环境");
      } else if (env == "production") {
        //上线环境
        host_ = "https://www.dstyao.com";
        console.log("上线环境");
      }
      // var host_ = "https://www.dstyao.com";
      $.ajax({
        type: "get",
        url: host_ + "/qy_weixin/jssdk-qy.php?url=" + encodeURIComponent(url), //替换网址，xxx根据自己jssdk文件位置修改
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "success_jsonpCallback",
        success: function (data) {
          wx.config({
            beta: true, //必须这么写，否则wx.invoke调用形式的jsapi会有问题
            // debug:true,//开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              "getContext",
              "sendChatMessage", //发送消息
              "launchMiniprogram", //跳转小程序
              "getCurExternalContact",
              "openUserProfile",
              "openEnterpriseChat",
              "getCurExternalChat"
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
                "getContext",
                "launchMiniprogram", //跳转小程序
                "getCurExternalContact",
                "openUserProfile",
                "openEnterpriseChat",
                "getCurExternalChat"
              ], //必填
              success: function (res) {
                // 页面跳转
                that.toJump();
              },
              fail: function (err) {},
            });
          });
        },
        error: function (data) {
          console.log(data);
        },
      });
    },
    toJump() {
      let that = this;
      if (wx.invoke) {
        wx.invoke("getContext", {}, function (res) {
          if (res.err_msg == "getContext:ok") {
            //返回进入H5页面的入口类型，目前有normal、contact_profile、single_chat_tools、group_chat_tools
            let entry = res.entry;
            if (entry === "single_chat_tools") {
              //从单聊进入
              wx.invoke("getCurExternalContact", {}, function (res2) {
                if (res2.err_msg == "getCurExternalContact:ok") {
                  var userId = res2.userId; //返回当前外部联系人userId
                  that.$router.push({
                    path: "/FamilyArchives",
                    query:{userId: userId,}
                  });
                } else {
                  //错误处理
                  // alert("2userId 失败");
                }
              });
              return;
            } else if (entry === "group_chat_tools") {
              wx.invoke("getCurExternalChat", {}, function (res3) {
                if (res3.err_msg == "getCurExternalChat:ok") {
                  var chatId = res3.chatId; //返回当前客户群的群聊ID
                  //从群聊进入
                  that.$router.push({ path: "/FileDetail", query:{chatId: chatId} });
                } else {
                  //错误处理
                }
              });
              return;
            } else if (entry === "contact_profile") {
              //从联系人详情进入
            } else if (entry === "normal") {
              //除以上场景之外进入，例如工作台，聊天会话等
            }
          } else {
            //错误处理
            Dialog.alert({
              title: "提示",
              message: "pos2:页面环境读取失败，请重新进入",
            }).then(() => {
              // on close
              window.location.reload();
            });
          }
        });
      } else {
        Dialog.alert({
          title: "提示",
          message: "页面环境读取失败，请重新进入",
        }).then(() => {
          // on close
          window.location.reload();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>