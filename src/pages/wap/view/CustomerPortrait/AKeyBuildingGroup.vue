<template>
  <div class="home">
    <div class="con header">
      <div class="label">
        <span class="l-span1"></span>
        <span class="l-span2">请选择客户的专属服务团队</span>
      </div>
      <div class="closebtn" @click="goBack()">关闭</div>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <div class="content-center">
        <div class="cell-box">
          <van-empty v-if="finished && tableData.length == 0" description="" />
          <van-list
            finished-text="没有更多了"
            @load="onLoad"
            v-model="loading"
            :finished="finished"
          >
            <van-radio-group v-model="result">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in tableData"
                  clickable
                  :key="index"
                  @click="toggle(item)"
                >
                  <template #title>
                    <div class="cell-title">
                      {{ item.groupName }}
                    </div>
                  </template>
                  <template #label>
                    <div class="cell-label">
                      默认成员: {{ showPeople(item.grouperList) }}
                    </div>
                  </template>
                  <template #right-icon>
                    <div class="cell-right-icon">
                      <van-radio :name="item.groupId" />
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-list>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div class="btn1" @click="createGroup">确定</div>
      <div class="btn2" @click="backIndex">取消</div>
    </div>

    <!-- <loading v-if="createGroupLoading"></loading> -->
    <div class="global-loading" v-if="createGroupLoading">
      <div class="global-loading-center">
        <van-loading size="24px" vertical color="#0094ff"
          >正在建群中...</van-loading
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getBuildGroupOfRules, getCustomerName } from "../../api/index.js";
import Child from "../../common/header";
import loading from "../loading/loading";
import { Notify, Dialog } from "vant";
export default {
  components: {
    child: Child,
    loading: loading,
  },
  created() {
    this.getCustomerName();
  },
  data() {
    return {
      userName: "",
      query: {
        pageNo: 1,
        pageSize: 10,
      },
      tableData: [],
      list: [],
      loading: false,
      finished: false,

      result: "",
      groupInfo: {},
      createGroupLoading: false, //建群进度
    };
  },
  methods: {
    showPeople(arr) {
      let peopleStr = "";
      arr &&
        arr.length &&
        arr.length > 0 &&
        arr.forEach((value, index, array) => {
          if (index + 1 == array.length) {
            peopleStr += value.name;
          } else {
            peopleStr += value.name + "、";
          }
        });
      return peopleStr;
    },
    onLoad() {
      console.log("load222");
      let that = this;

      wx.ready(function() {
        wx.invoke("getCurExternalContact", {}, function(res2) {
          if (res2.err_msg == "getCurExternalContact:ok") {
            var userId = res2.userId; //返回当前外部联系人userId
            console.log("获取userId 成功", userId);
            let query = { userid: userId };
            getCustomerName(query).then((res) => {
              // console.log(res, "用户信息");
              if (res.code == 0) {
                that.userName = res.data.name;
                that.getData();
              } else {
                Notify({
                  type: "error",
                  message: "获取客户昵称失败！",
                  duration: 800,
                });
              }
            });
          } else {
            that.createGroupLoading = false;
            //错误处理
            console.log("获取userId 失败");
            Notify({
              type: "error",
              message: "获取userId 失败,创建失败！",
              duration: 800,
            });
          }
        });
      });
    },
    getCustomerName() {
      let that = this;
      console.log("load111");
      wx.ready(function() {
        wx.invoke("getCurExternalContact", {}, function(res2) {
          if (res2.err_msg == "getCurExternalContact:ok") {
            var userId = res2.userId; //返回当前外部联系人userId
            console.log("获取userId 成功", userId);
            let query = { userid: userId };
            getCustomerName(query).then((res) => {
              // console.log(res, "用户信息");
              if (res.code == 0) {
                that.userName = res.data.name;
                that.getData();
              } else {
                Notify({
                  type: "error",
                  message: "获取客户昵称失败！",
                  duration: 800,
                });
              }
            });
          } else {
            that.createGroupLoading = false;
            //错误处理
            console.log("获取userId 失败");
            Notify({
              type: "error",
              message: "获取userId 失败,创建失败！",
              duration: 800,
            });
          }
        });
      });
    },
    getData(more) {
      if (more) {
        if (!this.finished) {
          var morePage = this.query.pageNo + 1;
          this.$set(this.query, "pageNo", morePage);
        }
      }
      let query = {
        pageNo: this.query.pageNo,
        pageSize: this.query.pageSize,
      };

      getBuildGroupOfRules(query)
        .then((res) => {
          // console.log("请求建群列表", res);
          this.loading = false;

          let data = res.data;
          let code = res.code;
          if (code === 0) {
            let list = data.list;

            if (list && list.length && list.length > 0) {
              list.filter((value, index, array) => {
                let nameArr = value.groupName.split(",");
                let nameStr = "";
                nameArr.forEach((val, ind, arr) => {
                  if (val === "slot") {
                    nameStr += `[${this.userName}]`;
                  } else {
                    nameStr += val;
                  }
                });
                value.groupName = nameStr;
              });

              //后端给的值 代表没有更多了
              if (data.total == this.tableData.length) {
                this.finished = true;
                return;
              }

              if (!more) {
                this.tableData = [...list];
              }
              if (more) {
                this.tableData = this.tableData.concat([...list]);
              }

              this.finished = false;
            } else {
              this.finished = true;
            }
          } else {
            console.log("数据获取失败，请稍后重试~");
            this.finished = false;
          }
        })
        .catch((err) => {
          this.finished = false;
          this.loading = false;
          console.log("网络连接失败，请稍后重试~", err);
          Notify({
            type: "error",
            message: "建群列表获取失败，请稍后重试~",
            duration: 800,
          });
        });
    },
    createGroup() {
      //新建群聊
      let that = this;
      this.createGroupLoading = true;
      if (!this.groupInfo.groupId || !this.groupInfo.groupName) {
        that.createGroupLoading = false;
        Notify({
          type: "warning",
          message: "请选择群名！",
          duration: 800,
        });
        return;
      }
      console.log("开始创建");
      wx.ready(function() {
        wx.invoke("getCurExternalContact", {}, function(res2) {
          if (res2.err_msg == "getCurExternalContact:ok") {
            var userId = res2.userId; //返回当前外部联系人userId
            console.log("获取userId 成功", userId);
            that.openEnterpriseChat(userId);
          } else {
            that.createGroupLoading = false;
            //错误处理
            console.log("获取userId 失败");
            Notify({
              type: "error",
              message: "获取userId 失败,创建失败！",
              duration: 800,
            });
          }
        });
      });
    },
    openEnterpriseChat(userId) {
      //userId 外部联系人 userId
      let that = this;
      let nameArr = this.groupInfo.groupName.split(",");
      let nameStr = "";
      nameArr.forEach((value, index, array) => {
        if (value === "slot") {
          nameStr += `[${this.userName}]`;
        } else {
          nameStr += value;
        }
      });

      let userIds = "";
      this.groupInfo.grouperList.forEach((value, index, array) => {
        userIds += value.grouperId + ";";
      });
      // console.log(
      //   JSON.stringify({
      //     userIds: "10000828;10001680;10000892;10004610;10007244",
      //     externalUserIds: userId + ";",
      //     groupName: nameStr,
      //     chatId: "",
      //   })
      // );
      wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
        userIds: userIds, //  "10000828;10001680;10000892;10004610;10007244", //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: userId + ";", // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: nameStr, // 会话名称。单聊时该参数传入空字符串""即可。
        chatId: "", // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
        success: function(res) {
          var chatId = res.chatId; //返回当前群聊ID，仅当使用agentConfig注入该接口权限时才返回chatId
          // 回调
          console.log("创建成功chatID", chatId);

          Notify({
            type: "success",
            message: "创建成功！",
            duration: 800,
          });
          that.createGroupLoading = false;
        },
        fail: function(res) {
          that.createGroupLoading = false;
          if (res.errMsg.indexOf("function not exist") > -1) {
            Notify({
              type: "error",
              message: "版本过低请升级，创建失败！",
              duration: 800,
            });
          } else {
            Notify({
              type: "error",
              message: "创建失败！",
              duration: 800,
            });
          }
        },
      });
    },
    toggle(item) {
      this.result = item.groupId;
      this.groupInfo = item;
      console.log(this.result, "选择结果", this.groupInfo);
    },
    backIndex() {
      this.$router.push("/CustomerPortrait"); //返回会员画像
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  position: fixed;
  z-index: 999;
  background: #fff;
  top: 0px;
  margin: 0 auto;
  left: 0px;
  right: 0px;

  // 会员标签
  .label {
    line-height: 30px;
    .l-span1 {
      display: inline-block;
      width: 4px;
      height: 13px;
      background-color: #3399ff;
    }
    .l-span2 {
      font-size: 16px;
      margin-left: 6px;
    }
  }
  .closebtn {
    color: #169bd5;
    font-size: 15px;
    line-height: 30px;
  }
}
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // padding-top: 50px;
  // padding-bottom: 50px;
  padding: 50px 0px;
  background: #fff;
  .content-center {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .cell-box {
      width: 90%;
      margin: 0 auto;
      padding-top: 15px;
      padding-bottom: 5px;
    }

    /deep/ .van-cell__title {
      flex-shrink: 0 !important;
      width: 70%;
    }

    /deep/ .van-cell {
      border: none;
      border: 1px solid gray;
      margin-bottom: 15px;
    }
    .cell-title {
      box-sizing: border-box;
      padding-right: 15px;
      font-size: 15px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cell-label {
      box-sizing: border-box;
      padding-right: 15px;
      font-size: 12px;
      color: #a8a8a8;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }
    .cell-right-icon {
      max-width: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
// 底部按钮
.footer {
  flex-shrink: 0;
  font-size: 14px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
  div {
    width: 40%;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
  }
  .btn1 {
    color: #fff;
    background-color: #169bd5;
  }
  .btn2 {
    border: 1px solid #797979;
    box-sizing: border-box;
    line-height: 39px;
  }
}
// 全局loading start
.global-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  .global-loading-center {
    width: 100%;
  }
}
// 全局loading end
</style>
