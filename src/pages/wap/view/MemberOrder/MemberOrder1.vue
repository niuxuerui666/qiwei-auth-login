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
        <div v-else>
          <div class="home">
            <!-- 头部内容 -->
            <div class="header van-hairline--bottom">
              <!-- <div class="menu-select-box">
                <div>
                  <van-dropdown-menu class="menu-select">
                    <van-dropdown-item
                      v-model="query.selectType"
                      :options="searchOption1"
                    />
                  </van-dropdown-menu>
                </div>
              </div> -->
              <div class="header-search">
                <van-search
                  show-action
                  v-model="query.keyword"
                  shape="round"
                  @search="onSearch"
                  @cancel="onCancel"
                  placeholder="请输入搜索关键词"
                />
              </div>
            </div>

            <!-- 内容部分 -->
            <div class="content">
              <div class="content-center">
                <!-- <van-empty v-if="finished && list.length == 0" description="" /> -->
                <div style="width:100%:margin-top:8px;" >
                  <van-list
                    finished-text="没有更多了"
                    @load="onLoad"
                    v-model="loading"
                    :finished="finished"
                  >
                    <van-card
                      v-for="(item, index) in list"
                      :key="index"
                      :desc="item.indication"
                      :title="item.name"
                    >
                      <template #title>
                        <span class="h-span1">订单编号:</span>
                        <span class="h-span2" v-if="item.source === '线下'">{{
                          item
                        }}</span>
                        <span class="h-span2" v-if="item.source === '线上'">{{
                          item
                        }}</span>
                      </template>
                      <template #desc>
                        <span class="h-span1">创建时间:</span>
                        <span class="h-span2">{{ item.downloadTime }}</span>
                      </template>
                    </van-card>

                    <div
                      style="height: 200px"
                      v-for="(item, index) in list"
                      :key="index"
                    >
                      <span class="h-span1">订单编号:</span>
                      <span class="h-span2">{{ item }}</span>
                    </div>
                  </van-list>
                </div>
              </div>
            </div>
            <div class="global-loading" v-if="globalLoading">
              <div class="global-loading-center">
                <van-loading size="24px" vertical color="#0094ff"
                  >发送中...</van-loading
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOnlinePlanListService, getUserTypeId } from "../../api";
import Clipboard from "clipboard";
import { Notify, Dialog } from "vant";
import utils from "../../utils/utils.js";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      memberId: "111", //保存当前用户的会员ID
      user_type: "111", //保存用户类型
      show: false, //控制弹出框显示隐藏
      mobile: "", //保存会员手机号
      orderList: [], //订单列表
      popupObj: {}, //保存 弹出框对象
      upGradeUrl: require("../../assets/notgold.jpg"), //非会员图片
      microimgUrl: require("../../assets/microimg.jpg"), //企微图片
      globalLoading: false,
      showContent: 1,
      query: {
        keyword: "", //商品名称   selectType==1
        goodsno: "", //商品编号   selectType==2
        selectType: 1, //	1商品名称2商品编号（必填）
        method: "getMemberOrderList",
        platformType: "wap",
        pageNo: 1, //必填
        pageSize: 10, //非必填
      },
      //   searchOption1: [
      //     { text: "商品名称", value: 1 },
      //     { text: "商品编号", value: 2 },
      //   ],

      list: [],
      loading: false,
      finished: false,

      list2: [],
      loading2: false,
      finished2: false,
      activeName: [],
      oneHeight: 0,
    };
  },
  created() {
    this.getUserId(this.$route.query.userId);
    this.getMemberOrderList();
    // this.getPhone();
    // this.getOnlinePlanListService();

    var timestamp = new Date().getTime();
    var sign = this.getSign(timestamp);
    var that = this;
    axios({
      url: "https://crm-api-test.111yao.cn:7443/api/order/getOrderList",
      method: "get",
      params: {
        pageNo: 1, //必填
        pageNum: 10, //必填
        mobile: "13609348710", //必填
        searchCondition: "", //非必填
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        timestamp,
        sign,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.list);
        this.list = res.data.data.list;
      })
      .catch((err) => {
        console.log(err, "err");
      });
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
        this.memberId = res.data.member_id;
        this.mobile = res.data.mobile;
        this.user_type = res.data.user_type;
        this.getMemberOrderList(res.data.mobile);
      });
    },
    // 显示弹框
    popupwindow(item) {
      this.show = true;
      this.popupObj = item;
    },
    //跳转商品详情
    ToGoodsDetail(pid) {
      let that = this;
    },
    //获取当前wap pc环境
    getPhone() {
      var env = process.env.NODE_ENV;
      // if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      //   console.log("环境为：pc端");
      //   if (env == "development") {
      //     window.location.href = "http://localhost:8080/pc.html/";
      //   } else if (env == "production") {
      //     window.location.href =
      //       "http://testrouter.111yao.com/html5/weixinProductList/pc.html";
      //   }
      // }
    },
    onLoad() {
      console.log("load");
      this.getMemberOrderList(true);
    },
    getMemberOrderList(more) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var that = this;
      axios({
        url: "https://crm-api-test.111yao.cn:7443/api/order/getOrderList",
        // url: "http://crm-api-test.111yao.cn:7001/api/memCard/getMemCardList",
        // url:"/crmapitest/api/order/getOrderList",
        // url: "https://router.111yao.com/sltRouter",
        method: "get",
        params: {
          pageNo: 1, //必填
          pageNum: 10, //必填
          mobile: "13609348710", //必填
          searchCondition: "", //非必填
        },
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          timestamp,
          sign,
        },
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.data);
          console.log(res.data.data.list);
          this.list = res.data.data.list;
          // if (res.data.msg === "成功") {
          //   // that.orderList = res.data.data;
          //   console.log(this.orderList);
          // }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    onSearch(val) {
      console.log(val);
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getMemberOrderList();
    },
    onCancel() {
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getMemberOrderList();
      console.log("取消");
    },
    delaySeach: utils.debounce(function () {
      //延时搜索  实时搜索
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getMemberOrderList();
    }),
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
  },
  watch: {
    "query.keyword"(newV, oldV) {
      this.delaySeach();
    },
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.microimg,
.notNumber {
  cursor: pointer;
  width: 100%;
  img {
    width: 100%;
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
  padding: 6px;
  .o-head {
    border-radius: 8px 8px 0 0;
    box-shadow: 0 0 4px #0000001a;
    background-color: #f1f1f1;
    font-size: 10px;
    display: flex;
    .o-head-source {
      p {
        background-color: #fff;
        color: #3399ff;
        width: 22px;
        height: 12px;
        border: 1px solid #3399ff;
        border-radius: 3px;
        text-align: center;
        line-height: 12px;
        font-size: 10px;
        margin-top: 6px;
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
      // .block-span1 {
      // }
      .block-span2 {
        color: #888;
      }
    }
  }
}
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  // overflow: hidden;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 999;
  background: #fff;
  top: 0px;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  .header-search {
    flex: 1;
    display: flex;
    align-items: center;
    /deep/ .van-search {
      width: 100%;
    }
  }
  .menu-select-box {
    flex-shrink: 0;
    width: 25%;
    box-sizing: border-box;
    padding: 0 0px; /*no*/
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      height: 100%;
      background: transparent;
      display: flex;
      align-items: center;
      // box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12); /*no*/
    }
    .menu-select {
      display: flex;
      align-items: center;
      /deep/ .van-dropdown-menu__bar {
        flex-shrink: 0;
        width: 100%;
        background: transparent;
        box-shadow: none;
      }
      // /deep/ .van-dropdown-menu__title {
      //   // border: 1px solid #e1e3e6; /*no*/
      //   // border-radius: 4px; /*no*/
      // }
      /deep/ .van-dropdown-menu__title--active {
        color: #409eff;
      }
      /deep/ .van-dropdown-item__option--active .van-dropdown-item__icon {
        color: #409eff;
      }
      /deep/ .van-dropdown-item__option--active {
        color: #409eff;
      }
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 30px;
  background: #fff;
  .content-center {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.content-center::-webkit-scrollbar {
  width: 4px; /*no */
  height: 5px; /*no */
}

.content-center::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 5px; /*no */
}

.content-center::-webkit-scrollbar-track {
  border-radius: 10px; /*no */
  width: 5px; /*no */
  height: 5px; /*no */
}

.text-hide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.flex-center {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/deep/ .van-card__thumb {
  width: 88px;
  height: 88px;
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
