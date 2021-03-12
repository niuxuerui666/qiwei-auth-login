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
      <div v-if="user_type === '2'">
        <img src="'../../assets/microimg.jpg'" />
      </div>
      <!-- 微信用户 -->
      <div v-if="user_type === '1'">
        <!-- 客户不是会员 -->
        <div class="notNumber" v-if="memberId === '' || null">
          <div @click="toSendUpGrade"><img :src="upGradeUrl" /></div>
        </div>
        <!-- 客户是会员 -->
        <div v-else>
          <div class="label">
            <span class="l-span1"></span>
            <span class="l-span2">会员订单</span>
          </div>
          <!-- 灰条 -->
          <div class="gray_line"></div>
          <div
            class="order"
            v-for="(item, index) in orderList"
            :key="index"
            @click="popupwindow(item)"
          >
            <div class="o-head">
              <table>
                <tr height="15px">
                  <td>
                    <span class="h-span1">订单编号:</span>
                    <span class="h-span2">{{ item.olOrderNo }}</span>
                  </td>
                  <td width="52%">
                    <span class="h-span1">创建时间:</span>
                    <span class="h-span2">{{ item.downloadTime }}</span>
                  </td>
                </tr>
                <tr>
                  <td width="160px">
                    <span class="h-span1">订单金额:</span>
                    <span class="h-span2">{{ item.payment }}</span>
                  </td>
                  <td>
                    <span class="h-span1">订单来源:</span>
                    <span class="h-span2">德生堂大药房旗舰店(天猫)</span>
                  </td>
                </tr>
              </table>
            </div>
            <!-- 订单身体部分 -->
            <div
              class="o-body"
              v-for="(res, resindex) in item.lineItems"
              :key="resindex"
            >
              <table>
                <tr>
                  <td width="60px">{{ res.wareId }}</td>
                  <td width="210px">{{ res.wareName }}</td>
                  <td width="50px">&times;{{ res.times }}</td>
                </tr>
              </table>
            </div>
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
              <span class="block-span1">联系电话:</span
              ><span class="block-span2">{{
                popupObj.receiverMobile ? popupObj.receiverMobile : "-"
              }}</span>
            </p>
            <p>
              <span class="block-span1">收货地址:</span
              ><span class="block-span2">{{
                popupObj.receiverState +
                "-" +
                popupObj.receiverCity +
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
    };
  },
  created() {
    this.getUserId(this.$route.query.userId);
    this.getMemberOrderList();
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
      // getUserTypeId(query).then((res) => {
      //   this.memberId = res.data.member_id;
      //   this.mobile = res.data.mobile;
      //   this.getMemberOrderList(res.data.mobile);
      //   this.user_type = res.data.user_type;
      // });
    },

    //   获取会员订单列表
    getMemberOrderList(mobile) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        // mobile: mobile,
        timestamp,
        sign,
        mobile: "13609348710",
      };

      axios({
        url: "http://crm-api-test.111yao.cn:7001/api/order/getOrderList",
        // url: "http://crm-api-test.111yao.cn:7001/api/memCard/getMemCardList",
        // url:"/crmapitest/api/order/getOrderList",
        // url: "https://router.111yao.com/sltRouter",
        method: "get",
        params: {
          // keyword: "", //商品名称   selectType==1
          // goodsno: "", //商品编号   selectType==2
          // selectType:"", //	1商品名称2商品编号（必填）
          // method: "getQiMoGoodsList",
          // platformType: "wap",
          // pageNo: 1, //必填
          // pageSize: 10, //非必填
          mobile: "13609348710",
        },
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          timestamp,
          sign,
        },
      })
        .then((res) => {
          console.log(res.data, "res");
        })
        .catch((err) => {
          debugger
          console.log(err, "err");
        });

      // getMemberOrder(query)
      //   .then((res) => {
      //     console.log(res, "xxxxx");
      //     this.orderList = res.data.data;
      //   })
      //   .catch((err) => {
      //     console.log(err, "shibai");
      //   });
    },
    // 显示弹框
    popupwindow(item) {
      this.show = true;
      this.popupObj = item;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.content {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
}
// 会员标签
.label {
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  line-height: 25px;
  display: flex;
  align-items: center;
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
// 订单信息
.order {
  padding: 10px;
  .o-head {
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 4px #0000001a;
    background-color: #f1f1f1;
    font-size: 10px;
    .h-span1 {
      line-height: 20px;
      color: #9b9b9b;
    }
    .h-span2 {
      color: #4a4a4a;
    }
  }
  .o-body {
    font-size: 12px;
    color: #4a4a4a;
    font-weight: bold;
    background-color: #fff;
    border-top: none;
    min-height: 30px;
    tr {
      height: 30px;
      td {
        line-height: 19px;
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