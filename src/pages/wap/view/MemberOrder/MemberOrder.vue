<template>
  <div>
    <!-- 等待接口加载 -->
    <div class="waiting" v-if="user_type === '' || null">
      <loading></loading>
    </div>
    <!-- 会员订单 -->
    <div class="content" v-else>
      <!-- 群聊入口进入 -->
      <!-- <div v-if="user_type === '3'">这是群聊进入的</div> -->
      <!-- 企微用户 -->
      <div v-if="user_type === '2'" class="microimg">
        <img :src="microimgUrl" />
      </div>
      <!-- 微信用户 -->
      <div v-if="user_type === '1'">
        <!-- 客户不是会员 -->
        <div class="notNumber" v-if="memberId === '' || null">
          <div @click="toSendUpGrade"><img :src="upGradeUrl" /></div>
        </div>
        <!-- 客户是会员 -->
        <div v-else-if="memberId != ''">
          <div class="label">
            <span class="l-span1"></span>
            <span class="l-span2">会员订单</span>
          </div>
          <!-- <div class="header-search">
            <van-search
              show-action
              v-model="keyword"
              shape="round"
              placeholder="请输入搜索关键词"
            >
              <template #action>
                <div v-if="keyword === ''" @click="onCancel()">取消</div>
                <div v-else @click="onSearch()">搜索</div>
              </template>
            </van-search>
          </div> -->

          <div class="order-list">
            <van-list
              finished-text="没有更多订单了"
              @load="onLoad"
              v-model="loading"
              :finished="finished"
            >
              <!-- <div class="ifExistOrder" v-if="orderList.length == 0">无相关订单~</div> -->
              <van-empty
                v-if="orderList && orderList.length === 0"
                description=""
              />
              <div
                class="order"
                v-for="(item, index) in orderList"
                :key="index"
                @click="popupwindow(item)"
              >
                <div class="o-head">
                  <table>
                    <tr height="12px">
                      <div class="o-head-source">
                        <p>{{ item.source ? item.source : "线下" }}</p>
                        <p v-if="item.unitFlag === '1'">
                          <span>方</span>
                        </p>
                      </div>
                    </tr>
                    <tr height="15px">
                      <td>
                        <span class="h-span1">订单编号:</span>
                        <span class="h-span2">{{
                          item.source === "线下" ? item.saleNo : item.olOrderNo
                        }}</span>
                      </td>
                      <td width="52%">
                        <span class="h-span1">创建时间:</span>
                        <span class="h-span2">{{
                          item.accDate | dealTime
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td width="160px">
                        <span class="h-span1">订单金额:</span>
                        <span class="h-span2">{{
                          item.payment ? item.payment : "-"
                        }}</span>
                      </td>
                      <td>
                        <span class="h-span1">订单来源:</span>
                        <span class="h-span2">{{
                          item.source === "线下"
                            ? item.busName
                            : item.indentSource
                        }}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- 订单身体部分 -->
                <div class="o-body">
                  <div class="o-body-square" v-if="item.squareList.length > 0">
                    <div v-for="(resList, key) in item.squareObj" :key="key">
                      <div><span>方案名称:</span>{{ key }}</div>
                      <!-- 循环方订单 -->
                      <table>
                        <tr
                          v-for="innerList in resList"
                          :key="innerList.makeNo"
                        >
                          <td width="30%">
                            <p>{{ innerList.wareName }}</p>
                          </td>
                          <td width="30%">
                            {{ innerList.amount | dealString }}
                          </td>
                          <td width="30%">
                            &times;{{ innerList.wareQty | dealString }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <!-- 循环单品 -->
                  <div class="o-body-nosquare">
                    <!-- 循环非方订单 -->
                    <table v-if="item.noSquareList.length > 0">
                      <tr
                        v-for="(res, index) in item.noSquareList"
                        :key="index"
                      >
                        <td width="30%">
                          <p>{{ res.wareName }}</p>
                          <p class="o-p2">{{ res.wareSpec }}</p>
                          <p class="o-p3">{{ res.wareId }}</p>
                        </td>
                        <td width="30%">{{ res.amount | dealString }}</td>
                        <td width="30%">
                          &times;{{ res.wareQty | dealString }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <div>
            <p>
              <span class="block-span1">收货人:</span
              ><span class="block-span2">{{
                popupObj.receiverName ? popupObj.receiverName : "-"
              }}</span>
            </p>
            <p>
              <span class="block-span1">联系电话:</span>
              <span class="block-span2">{{
                popupObj.receiverMobile ? popupObj.receiverMobile : "-"
              }}</span>
            </p>
            <p>
              <span class="block-span1">收货地址:</span>
              <span class="block-span2">{{
                popupObj.receiverState +
                  "-" +
                  popupObj.receiverCity +
                  "-" +
                  popupObj.receiverDistrict +
                  "-" +
                  popupObj.receiverAddress
              }}</span>
            </p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getMemberOrder, getUserTypeId } from "../../api/index";
import loading from "../loading/loading";
import axios from "axios";
import { Toast, Notify, Dialog } from "vant";
export default {
  components: {
    loading,
  },
  data() {
    return {
      memberId: "111", //保存当前用户的会员ID
      user_type: "1", //保存用户类型
      show: false, //控制弹出框显示隐藏
      mobile: "", //保存会员手机号
      orderList: [], //订单列表
      popupObj: {}, //保存 弹出框对象
      upGradeUrl: require("../../assets/notgold.jpg"), //非会员图片
      microimgUrl: require("../../assets/microimg.jpg"), //企微图片
      finished: false, //判断是否加载完成
      loading: false, //
      pageNo: 1, //页码
      keyword: "", //输入的值
    };
  },
  filters: {
    // 过滤价格
    dealString(val) {
      return val.slice(0, -4);
    },
    // 过滤时间
    dealTime(val) {
      return val.slice(0, -5);
    },
  },
  created() {
    this.memberId = this.$route.query.userId;
    this.mobile = this.$route.query.phone;
    this.getMemberOrderList(false, this.mobile, "");

    // this.getUserId(this.$route.query.userId);
    // this.getMemberOrderList(); //到企微关闭
  },
  methods: {
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 根据user_id 获取用户的各种ID member_id unionid mobile手机号
    getUserId(userid) {
      var that = this;
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        user_id: userid,
        timestamp,
        sign,
      };
      getUserTypeId(query).then((res) => {
        if (res.code === "1") {
          this.memberId = res.data.member_id;
          this.mobile = res.data.mobile;
          this.user_type = res.data.user_type;
          if (res.data.mobile != "") {
            this.getMemberOrderList(false, res.data.mobile, "");
          }
        } else {
          this.$router.push({ path: "/500" });
        }
      });
    },
    // 聚焦清空列表
    // toFocusSearch() {
    //   this.pageNo = 1;
    //   this.orderList = [];
    //   // this.getMemberOrderList = false;
    // },
    // 输入框内容为空重新加载
    // toBlurSearch() {
    //   this.pageNo = 1;
    //   this.orderList = [];
    //   if (this.keyword.trim() == "") {
    //     this.getMemberOrderList(false, this.mobile, this.keyword);
    //   }
    // },
    // 查询相关订单
    onSearch() {
      this.pageNo = 1;
      this.orderList = [];
      this.keyword = this.keyword.trim();
      if (this.keyword == "") {
        Toast.fail({ message: "搜索内容不能为空", duration: 500 });
        return;
      }
      this.getMemberOrderList(false, this.mobile, this.keyword);
    },
    // 取消查询
    onCancel() {
      this.pageNo = 1;
      this.orderList = [];
      this.keyword = this.keyword.trim();
      this.getMemberOrderList(false, this.mobile, "");
    },
    // 判断是否包含方订单
    ifContentSquare(list) {
      if (list && list.length > 0) {
        list.forEach((item) => {
          item.unitFlag = "0"; //默认0
          item.squareList = []; //保存方订单
          item.squareNameList = []; //保存方订单名称
          item.squareObj = {}; //保存方订单对应的
          item.noSquareList = []; //保存非方订单
          if (item.lineItems.length > 0) {
            item.lineItems.forEach((items) => {
              if (items.unitFlag === "1") {
                item.unitFlag = "1"; //方订单改为1
                item.squareList.push(items);
                item.squareNameList.push(items.unitUseName);
              } else {
                item.noSquareList.push(items);
              }
            });
            item.squareNameList = [...new Set(item.squareNameList)]; //方名称去重
            // 拿到不同方对应的药品  遍历所有的方订单
            item.squareNameList.forEach((res1) => {
              item.squareObj[res1] = [];
              item.squareList.forEach((res2) => {
                if (res1 == res2.unitUseName) {
                  item.squareObj[res1].push(res2);
                }
              });
            });
          }
        });
      }
      return list;
    },
    onLoad() {
      if (this.mobile != "") {
        this.getMemberOrderList(true, this.recodeId, this.keyword);
      }
    },
    //   获取会员订单列表
    getMemberOrderList(more, mobile, value) {
      if (more) {
        if (!this.finished) {
          this.pageNo = this.pageNo + 1;
        }
      }
      Toast.loading({ message: "加载中..." });
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      axios({
        url: "https://crm-api-test.111yao.cn:7443/api/order/getOrderList",
        // url: "http://crm-api-test.111yao.cn:7001/api/memCard/getMemCardList",
        method: "get",
        params: {
          pageNo: this.pageNo, //必填
          pageNum: 10, //必填
          mobile: "13609348710", //必填 上线删除
          // mobile: mobile, //必填
          searchCondition: value, //非必填
        },
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          timestamp,
          sign,
        },
      })
        .then((res) => {
          this.loading = false;
          // this.finished = true;
          if ((res.statusCode = 1)) {
            if (res.data.data.list && res.data.data.list.length > 0) {
              if (!more) {
                this.orderList = this.ifContentSquare(res.data.data.list);
              }
              if (more) {
                this.orderList = this.orderList.concat(
                  this.ifContentSquare(res.data.data.list)
                );
              }
              this.finished = false;
            } else {
              this.finished = true;
            }
          }
          console.log(this.orderList, "xxx");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    // 点击发送升级会员卡片
    toSendUpGrade() {
      let that = this;
      // alert(JSON.stringify(obj))
      that.globalLoading = true;
      if (wx.invoke) {
        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "miniprogram", //消息类型，必填
            miniprogram: {
              appid: "wx0be4163af4e66222", //小程序的appid
              // title: "这是小程序标题", //小程序消息的title
              // imgUrl:
              // "https://img.zdfei.com/static/image/goods//201808/64f0a1299ad5bc1c7fc464074c467c0b.jpg", //小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
              // page: "/pages/Index/index.html", //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
              title: "注册成为金卡会员，拥有私属家庭医生，领取惊喜大礼包",
              imgUrl:
                "https://111yao.oss-cn-beijing.aliyuncs.com/webFile/html5/Bronchitis/images/1.jpg",
              page:
                "/pages/TobindingHtml/index.html?type=GetUserInfos&bingdingType=bingding_dst_let",
            },
          },
          function(res) {
            that.globalLoading = false;
            if (res.err_msg == "sendChatMessage:ok") {
              //发送成功
              Notify({ type: "success", message: "发送中", duration: 500 });
            } else {
              Dialog.alert({
                title: "提示",
                message: "sorry1~ 发送失败,请刷新页面重试!",
              }).then(() => {
                // on close
                window.location.reload();
              });
            }
          }
        );
      } else {
        that.globalLoading = false;
        Dialog.alert({
          title: "提示",
          message: "sorry2~ 发送失败,请刷新页面重试!",
        }).then(() => {
          // on close
          window.location.reload();
        });
      }
    },
    // 显示弹框
    popupwindow(item) {
      if (item.source === "线上") {
        this.show = true;
        this.popupObj = item;
      } else {
        Toast.fail({ message: "线下订单不支持查看", duration: 800 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.microimg {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.waiting {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 会员标签
.label {
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  .l-span1 {
    display: inline-block;
    width: 4px;
    height: 15px;
    background-color: #4a90e2;
    vertical-align: middle;
  }
  .l-span2 {
    font-size: 15px;
    margin-left: 6px;
  }
}
// 非会员图片样式
.notNumber {
  cursor: pointer;
  img {
    width: 100%;
  }
}
.order-list {
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px 50px 10px;
  overflow-y: auto;
  overflow-x: hidden;
  /deep/ .van-list__finished-text {
    font-size: 11px;
  }
  .ifExistOrder {
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #c1c1c3;
  }
  // 订单信息
  .order {
    margin: 5px 0;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    .o-head {
      border-bottom: 1px dashed #eeeeeec7;
      font-size: 10px;
      box-sizing: border-box;
      padding: 5px;
      table {
        width: 100%;
        .o-head-source {
          display: flex;
          p {
            background-color: #6bb5ff2d;
            color: #3399ff;
            min-width: 24px;
            height: 12px;
            border: 1px solid #3399ff;
            border-radius: 3px;
            text-align: center;
            line-height: 12px;
            font-size: 10px;
            margin-right: 5px;
          }
        }
      }

      .h-span1 {
        line-height: 20px;
        color: #9b9b9b;
      }
      .h-span2 {
        color: #4a4a4a;
      }
    }
    .o-body {
      font-size: 11px;
      color: #4a4a4a;
      font-weight: bold;
      background-color: #fff;
      border-top: none;
      min-height: 30px;
      .o-body-square,
      .o-body-nosquare {
        width: 100%;
        padding: 3px;
        box-sizing: border-box;
        table {
          width: 100%;
          tr {
            height: 30px;
            td {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              line-height: 19px;
              p {
                line-height: 14px;
              }
              .o-p2,
              .o-p3 {
                font-size: 10px;
                color: #666;
              }
              .o-p3 {
                margin-bottom: 3px;
              }
            }
          }
        }
      }
      .o-body-square {
        table {
          box-sizing: border-box;
          padding-left: 5px;
          font-weight: normal;
        }
      }
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 90%;
    min-height: 120px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    p {
      line-height: 20px;
      font-size: 12px;
      .block-span1 {
      }
      .block-span2 {
        color: #888;
      }
    }
  }
}
</style>
