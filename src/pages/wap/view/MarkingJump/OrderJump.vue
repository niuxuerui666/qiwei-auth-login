<template>
  <div class="active">
    <!-- {{ theRequest }} -->
    <loading v-if="loadingFlag"></loading>
  </div>
</template>

<script>
import { Notify, Dialog } from "vant";
import { getMemberPortrait, getMemberRelation } from "../../api/index";
import loading from "../loading/loading";
import config from "../../utils/config.js";
export default {
  created() {
    this.initSevenFish();
  },
  components: {
    loading,
  },
  data() {
    return {
      loadingFlag: false,
      theRequest: {}, //地址栏参数

      rowOtherInfo: {}, //列表里的有用数据
      memberPortrait: {}, //360会员画像数据
      relation: {}, //360会员关系
    };
  },
  methods: {
    initSevenFish() {
      console.log("会员画像");
      console.log("window.location-会员画像", window.location);

      var Request = {};
      Request = this.GetRequest();
      this.theRequest = { ...Request };

      this.loadingFlag = false;

      this.toJump(); //跳转至
      // this.handleEdit();
    },
    //编辑操作    处理会员画像  两个接口和列表里 的整体数据
    async handleEdit() {
      const loading = this.$loading({
        lock: true,
        text: "正在获取会员画像信息...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      //1.获取360画像
      let query = {
        data: this.theRequest.UserId ? this.theRequest.UserId : "",
        type: 2,
      };
      await getMemberPortrait(query)
        .then((res) => {
          if (res.code === "1") {
            this.memberPortrait = {
              ...res.data.CustomerInfo,
            };

            console.log("会员画像数据", res);
          } else {
            this.$message.error("获取会员画像数据失败!");
            loading.close();
          }
        })
        .catch((err) => {
          this.$message.error("获取会员画像数据失败!");
          loading.close();
        });

      //3. 获取360 关系

      console.log("标签信息开始");

      //4.根据德勤 oneId  获取用户标签
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      console.log("标签信息开始222");
      this.$axios({
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          timestamp,
          sign,
        },
        // url: config.QUOTE_swagger_URI + "/api/user/queryUserTags",
        url: "https://crm-api-test.111yao.cn:7443/api/user/queryUserTags",
        method: "get",
        params: {
          oneId: this.memberPortrait.OneID__c
            ? this.memberPortrait.OneID__c
            : "",
        },
      })
        .then((res) => {
          console.log("标签信息", res);

          loading.close();

          this.toJump(); //跳转至

          // if (res.data.code === 0) {
          //   let taglist = res.data.data.tags;
          //   if (taglist && taglist.length && taglist.length > 0) {
          //     let alltag = [];
          //     taglist.forEach((value) => {
          //       let arr = value.value.split(",");
          //       alltag = alltag.concat([...arr]);
          //     });
          //     this.memberPortrait.only_taglist = [...new Set(alltag)];
          //   } else {
          //     this.memberPortrait.only_taglist = [];
          //   }
          // } else {
          //   this.$message({
          //     type: "error",
          //     message: res.data.msg ? res.data.msg : "获取标签信息失败！",
          //   });
          //   this.memberPortrait.only_taglist = [];
          // }
        })
        .catch((err) => {
          //网络失败
          this.$message({
            type: "error",
            message: "获取标签信息失败！" + JSON.stringify(err),
          });
        });
    },

    toJump() {
      console.log("this.theRequest", this.theRequest);
      if (
        this.theRequest.UserId !== undefined &&
        this.theRequest.UserId !== null &&
        this.theRequest.UserId !== ""
      ) {
        this.$router.push({
          path: "/MemberOrder",
          query: {
            userId: this.theRequest.UserId ? this.theRequest.UserId : "",
            phone: this.theRequest.phone ? this.theRequest.phone : "",
          },
        });
      } else {
        //不是会员
        this.$router.push({
          path: "/nonmember",
        });
      }
    },
    GetRequest() {
      //获取地址栏所有的参数
      var url = location.href; //获取url中"?"符后的字串
      var theRequest = new Object();

      if (url.indexOf("?") != -1) {
        var num = url.indexOf("?");
        var str = url.substr(num + 1);
        let strs = [];
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      console.log(theRequest);
      return theRequest;
    },
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
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
