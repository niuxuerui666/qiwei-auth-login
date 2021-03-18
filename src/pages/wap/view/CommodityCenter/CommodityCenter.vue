<template>
  <div class="home">
    <!-- 头部内容 -->
    <div class="header van-hairline--bottom" v-if="showContent == 1">
      <div class="menu-select-box">
        <div>
          <van-dropdown-menu class="menu-select">
            <van-dropdown-item
              v-model="query.selectType"
              :options="searchOption1"
            />
          </van-dropdown-menu>
        </div>
      </div>
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
    <!-- 头部内容 -->
    <div class="header van-hairline--bottom" v-if="showContent == 2">
      <div class="menu-select-box">
        <div>
          <van-dropdown-menu class="menu-select">
            <van-dropdown-item
              v-model="query2.searchType"
              :options="searchOption2"
            />
          </van-dropdown-menu>
        </div>
      </div>
      <div class="header-search">
        <van-search
          v-model="query2.keyword"
          shape="round"
          @search="onSearch2"
          show-action
          @cancel="onCancel2"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content" v-if="showContent == 1">
      <div class="content-center">
        <van-empty v-if="finished && list.length == 0" description="" />
        <div style="width:100%:margin-top:8px;"></div>
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
            <!-- :price="item.price" -->
            <template #thumb>
              <div class="card-img">
                <img
                  :src="'https://img.zdfei.com/' + item.image"
                  alt=""
                  @click="ToGoodsDetail(item.pid)"
                />
              </div>
            </template>
            <template #title>
              <!-- <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag> -->
              <div>{{ item.name }}</div>
            </template>
            <template #desc>
              <div style="color: #1989fa;" class="text-hide">
                {{ item.indication }}
              </div>
            </template>
            <template #tags>
              <!-- <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag> -->
              <div class="flex-center" style="margin : 3px 0;">
                <span> 商品编码：{{ item.goodsno }}</span>
                <span>
                  <van-button
                    size="small"
                    @click="
                      sendTheGoods(
                        item.pid,
                        'https://img.zdfei.com/' + item.image,
                        item.name
                      )
                    "
                    >发送</van-button
                  >
                  <van-button
                    :class="'copy-btn-' + item.pid"
                    size="small"
                    plain
                    type="info"
                    style="margin-left:4px;"
                    :data-clipboard-text="
                      `https://m.111yao.com//html5/goodsdetail/index.html?id=${item.pid}`
                    "
                    @click="copyPath(item.pid)"
                    >复制</van-button
                  >
                </span>
              </div>
              <!-- <div>库存：{{ item.stock }}</div> -->
              <div>规格：{{ item.spec }}</div>
            </template>
            <!-- <template #num>
            <van-button size="small">复制链接</van-button>
            <van-button size="small">发送</van-button>
          </template> -->
            <!-- <template #footer>
            <van-button size="small">复制链接</van-button>
            <van-button size="small">发送</van-button>
          </template> -->
          </van-card>
        </van-list>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content" v-if="showContent == 2">
      <div class="content-center">
        <van-empty v-if="finished2 && list2.length == 0" description="" />
        <van-list
          finished-text="没有更多了"
          @load="onLoad2"
          v-model="loading2"
          :finished="finished2"
        >
          <div class="card-all-box" v-for="(item, index) in list2" :key="index">
            <div class="card-style">
              <div class="card-img">
                <img
                  :src="item.planImg"
                  alt=""
                  @click="ToGoodsFang(item.planNoCommon)"
                />
              </div>
              <div class="card-name">
                <p style="font-size:14px;font-weight:#333;">
                  方案名称：{{ item.name }}
                </p>
                <p style="color: rgb(25, 137, 250);margin-bottom:8px;">
                  {{ item.cure }}
                </p>
                <p style="margin-bottom:8px;">
                  方案编码：{{ item.planNoCommon }}
                </p>
                <p
                  v-for="(it, ind) in item.datailList"
                  :key="ind"
                  style="width:90%;display:flex;justify-content: space-between;"
                >
                  <span class="text-hide" style="width:50%;">{{
                    it.name
                  }}</span>
                  <span>x{{ it.count }}</span>
                </p>
              </div>
              <!-- <div class="card-detail">
              <p v-for="(it, ind) in item.datailList" :key="ind">
                <span>{{ it.name }}</span>
              </p>
            </div> -->
              <div class="card-btn">
                <div class="flex-center">
                  <van-button
                    size="small"
                    @click="
                      sendThePckage(item.planNoCommon, item.planImg, item.name)
                    "
                    >发送</van-button
                  >
                  <van-button
                    :class="'copy-btn-plan-' + item.planNoCommon"
                    size="small"
                    plain
                    type="info"
                    style="margin-left:4px;"
                    :data-clipboard-text="
                      `http://m.111yao.com/html5/goodsdetailplan/index.html?planNoCommon=${item.planNoCommon}`
                    "
                    @click="copyText(item.planNoCommon)"
                    >复制</van-button
                  >
                </div>

                <div class="btn-drap">
                  <van-icon
                    name="arrow-down"
                    v-show="!item.open"
                    @click="openItem(index)"
                  />
                  <van-icon
                    name="arrow-up"
                    v-show="item.open"
                    @click="closeItem(index)"
                  />
                </div>
              </div>
            </div>
            <div
              :class="{ 'card-drag': true }"
              :style="{
                'max-height': item.open
                  ? 2.35 * item.datailList.length + 2 + 'rem'
                  : '0',
              }"
            >
              <van-card
                v-for="(it, ind) in item.datailList"
                :key="ind"
                :thumb="it.goodsImg"
              >
                <template #title>
                  <div>名称：{{ it.name }}</div>
                </template>
                <template #desc>
                  <div style="margin-top:5px;">规格：{{ it.spec }}</div>
                </template>
                <template #tags>
                  <div class="flex-center" style="margin-top:5px;">
                    <span>数量：{{ it.count }}</span>
                  </div>
                  <div style="margin-top:5px;">编号：{{ it.goodsNo }}</div>
                </template>
                <!-- <template #price>
                  <div>编号：{{ it.goodsNo }}</div>
                </template> -->
              </van-card>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="footer  van-hairline--top">
      <van-tabs class="footer-tabs" @click="onTabClick">
        <van-tab title="商品">
          <template #title>
            <div class="footer-icon">
              <van-icon name="shop-o" />
              <span>商品 </span>
            </div>
          </template>
        </van-tab>
        <van-tab title="照顾方案">
          <template #title>
            <div class="footer-icon">
              <van-icon name="shop-collect-o" />
              <span>照顾方案 </span>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="global-loading" v-if="globalLoading">
      <div class="global-loading-center">
        <van-loading size="24px" vertical color="#0094ff"
          >发送中...</van-loading
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getQiMoGoodsList, getOnlinePlanListService } from "../../api";
import Clipboard from "clipboard";
import { Notify, Dialog } from "vant";
import utils from "../../utils/utils.js";
export default {
  name: "Home",
  data() {
    return {
      globalLoading: false,
      showContent: 1,
      query: {
        keyword: "", //商品名称   selectType==1
        goodsno: "", //商品编号   selectType==2
        selectType: 1, //	1商品名称2商品编号（必填）
        method: "getQiMoGoodsList",
        platformType: "wap",
        pageNo: 1, //必填
        pageSize: 10, //非必填
      },
      query2: {
        keyword: "", //输入值
        searchType: 1,
        planName: "", //方案名称  searchType==1  必传
        planNoCommon: "", //方案编码  searchType==2  必传
        method: "getOnlinePlanListService",
        page: 1,
        pageSize: 5,
      },
      searchOption1: [
        { text: "商品名称", value: 1 },
        { text: "商品编号", value: 2 },
      ],
      searchOption2: [
        { text: "方案名称", value: 1 },
        { text: "方案编码", value: 2 },
      ],

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
    this.getPhone();
    this.getQiMoGoodsList();
    this.getOnlinePlanListService();
  },
  mounted() {
    this.initPage();
    this.weixin();
  },

  components: {},

  computed: {},

  methods: {
    copyPath(pid) {
      // console.log(".copy-btn-" + pid);
      var clipboard = new Clipboard(".copy-btn-" + pid);
      this.$nextTick(() => {
        clipboard.on("success", (e) => {
          // console.log("复制成功", e);
          // 主要通知
          Notify({ type: "success", message: "复制成功", duration: 500 });
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", (e) => {
          // 不支持复制
          // 警告通知
          Notify({
            type: "warning",
            message: "该浏览器不支持自动复制",
            duration: 500,
          });
          // console.log("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
        });
      });
    },
    copyText(pid) {
      var clipboard = new Clipboard(".copy-btn-plan-" + pid);
      this.$nextTick(() => {
        clipboard.on("success", (e) => {
          // console.log("复制成功", e);
          // 主要通知
          Notify({ type: "success", message: "复制成功", duration: 500 });
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", (e) => {
          // 不支持复制
          // 警告通知
          Notify({
            type: "warning",
            message: "该浏览器不支持自动复制",
            duration: 500,
          });
          // console.log("该浏览器不支持自动复制");
          // 释放内存
          clipboard.destroy();
        });
      });
    },
    closeItem(index) {
      this.$set(this.list2[index], "open", false);
    },
    openItem(index) {
      this.$set(this.list2[index], "open", true);
    },
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
        success: function(data) {
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
          wx.ready(function() {
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
              success: function(res) {
                // alert("成功-====");
                // alert(JSON.stringify(res));
              },
              fail: function(err) {
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
        error: function(data) {
          console.log(data);
        },
      });
    },
    ToSendChatMessage(obj) {
      let that = this;
      // alert(JSON.stringify(obj))
      that.globalLoading = true;
      if (wx.invoke) {
        var sendObj = {};
        if (obj.type == "goods") {
          sendObj = {
            title: obj.name,
            imgUrl: obj.img,
            page: "/pages/GoodsDetail/index.html?id=" + obj.goodsno,
          };
        } else if (obj.type == "pckage") {
          sendObj = {
            title: obj.name,
            imgUrl: obj.img,
            page:
              "/pages/partyDetail/index.html?planNoCommon=" + obj.planNoCommon,
          };
        }

        wx.invoke(
          "sendChatMessage",
          {
            msgtype: "miniprogram", //消息类型，必填
            miniprogram: {
              appid: "wx0be4163af4e66222", //小程序的appid
              // title: "这是小程序标题", //小程序消息的title
              // imgUrl:
              //   "https://img.zdfei.com/static/image/goods//201808/64f0a1299ad5bc1c7fc464074c467c0b.jpg", //小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
              // page: "/pages/Index/index.html", //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
              ...sendObj,
            },
          },
          function(res) {
            that.globalLoading = false;
            if (res.err_msg == "sendChatMessage:ok") {
              //发送成功
              Notify({ type: "success", message: "发送中", duration: 500 });
            } else {
              // window.location.reload();
              // Dialog.alert({
              //   title: "提示",
              //   message:
              //     "sorry~ 发送失败,请刷新页面重试!1111" + JSON.stringify(res),
              // }).then(() => {
              //   // on close
              //   window.location.reload();
              // });
            }
          }
        );
      } else {
        that.globalLoading = false;
        window.location.reload();
        // Dialog.alert({
        //   title: "提示",
        //   message: "sorry~ 发送失败,请刷新页面重试!2222" + JSON.stringify(res),
        // }).then(() => {
        //   // on close
        //   window.location.reload();
        // });
      }
    },
    //发送商品
    sendTheGoods(goodsno, img, name) {
      this.ToSendChatMessage({ type: "goods", goodsno: goodsno, img, name });
    },
    //发送方案
    sendThePckage(planNoCommon, img, name) {
      this.ToSendChatMessage({
        type: "pckage",
        planNoCommon: planNoCommon,
        img,
        name,
      });
    },
    //跳转商品详情
    ToGoodsDetail(pid) {
      let that = this;
      that.globalLoading = true;
      if (wx.invoke) {
        wx.invoke(
          "launchMiniprogram",
          {
            appid: "wx0be4163af4e66222", // 需跳转的小程序appid
            path: "/pages/GoodsDetail/index.html?id=" + pid, // 所需跳转的小程序内页面路径及参数。非必填
          },
          function(res) {
            that.globalLoading = false;
            if (res.err_msg == "launchMiniprogram:ok") {
              // 正常
            } else {
              // 错误处理
              Dialog.alert({
                title: "提示",
                message: "sorry~ 跳转失败,请刷新页面重试!",
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
          message: "sorry~ 跳转失败,请刷新页面重试!",
        }).then(() => {
          // on close
          window.location.reload();
        });
      }
    },
    //跳转方案
    ToGoodsFang(pid) {
      if (wx.invoke) {
        wx.invoke(
          "launchMiniprogram",
          {
            appid: "wx0be4163af4e66222", // 需跳转的小程序appid
            path: "/pages/partyDetail/index.html?planNoCommon=" + pid, // 所需跳转的小程序内页面路径及参数。非必填
          },
          function(res) {
            if (res.err_msg == "launchMiniprogram:ok") {
              // 正常
            } else {
              // 错误处理
              Dialog.alert({
                title: "提示",
                message: "sorry~ 跳转失败,请刷新页面重试!",
              }).then(() => {
                // on close
                window.location.reload();
              });
            }
          }
        );
      } else {
        Dialog.alert({
          title: "提示",
          message: "sorry~ 跳转失败,请刷新页面重试!",
        }).then(() => {
          // on close
          window.location.reload();
        });
      }
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
    initPage() {},
    onLoad() {
      console.log("load");
      this.getQiMoGoodsList(true);
    },
    onLoad2() {
      console.log("load2");
      this.getOnlinePlanListService(true);
    },
    getQiMoGoodsList(more) {
      if (more) {
        if (!this.finished) {
          var morePage = this.query.pageNo + 1;
          this.$set(this.query, "pageNo", morePage);
        }
      }
      // console.log("more", morePage);
      let { keyword, goodsno, selectType, pageNo, pageSize } = this.query;
      let params = {
        keyword: selectType == 1 ? keyword : "", //商品名称   selectType==1
        goodsno: selectType == 2 ? keyword : "", //商品编号   selectType==2
        selectType, //	1商品名称2商品编号（必填）
        method: "getQiMoGoodsList",
        platformType: "wap",
        pageNo, //必填
        pageSize, //非必填
      };
      getQiMoGoodsList(params).then((res) => {
        console.log(res, selectType, "selectType");
        this.loading = false;
        // this.finished = true;
        if ((res.statusCode = 1)) {
          if (res.list && res.list.length > 0) {
            if (!more) {
              this.list = res.list;
            }
            if (more) {
              this.list = this.list.concat(res.list);
            }
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });
    },
    getOnlinePlanListService(more) {
      if (more) {
        if (!this.finished2) {
          var morePage = this.query2.page + 1;
          this.$set(this.query2, "page", morePage);
        }
      }
      let { keyword, searchType, page, pageSize } = this.query2;
      let params = {
        // planName: "", //方案名称  searchType==1  必传
        // planNoCommon: "", //方案编码  searchType==2  必传
        method: "getOnlinePlanListService",
        page,
        pageSize,
      };
      if (searchType == 1) {
        params.planName = keyword;
        // console.log("pp1", params);
      }
      if (searchType == 2) {
        params.planNoCommon = keyword;
        // console.log("pp2", params);
      }

      getOnlinePlanListService(params).then((res) => {
        // console.log(res, "22");
        this.loading2 = false;
        if ((res.statusCode = 1)) {
          if (res.pw.result && res.pw.result.length > 0) {
            if (!more) {
              this.list2 = res.pw.result;
            }
            if (more) {
              this.list2 = this.list2.concat(res.pw.result);
            }
            this.finished2 = false;
          } else {
            this.finished2 = true;
          }
        }
      });
    },
    onTabClick(nth, title) {
      this.showContent = nth + 1;
      console.log("nth,title", nth, title);
    },
    onSearch(val) {
      console.log(val);
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getQiMoGoodsList();
    },
    onSearch2(val) {
      console.log(val);
      this.$set(this.query2, "page", 1);
      this.list2 = [];
      this.getOnlinePlanListService();
    },
    onCancel() {
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getQiMoGoodsList();
      console.log("取消");
    },
    onCancel2() {
      this.$set(this.query2, "page", 1);
      this.list2 = [];
      this.getOnlinePlanListService();
      console.log("取消");
    },
    delay: utils.debounce(function() {
      //延时搜索  实时搜索
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getQiMoGoodsList();
    }),
    delay2: utils.debounce(function() {
      //实时搜索
      this.$set(this.query2, "page", 1);
      this.list2 = [];
      this.getOnlinePlanListService();
    }),
  },
  watch: {
    "query.selectType"(newV, oldV) {
      this.$set(this.query, "pageNo", 1);
      this.list = [];
      this.getQiMoGoodsList();
    },
    "query2.searchType"(newV, oldV) {
      this.$set(this.query2, "page", 1);
      this.list2 = [];
      this.getOnlinePlanListService();
    },
    "query.keyword"(newV, oldV) {
      this.delay();
    },
    "query2.keyword"(newV, oldV) {
      this.delay2();
    },

    showContent(oldV, newV) {
      if (newV == 1) {
        this.$set(this.query, "pageNo", 1);
        this.list = [];
        this.getQiMoGoodsList();
      } else if (newV == 2) {
        this.$set(this.query2, "page", 1);
        this.list2 = [];
        this.getOnlinePlanListService();
      }
    },

    // "query.keyword"(oldV, newV) {
    //   this.$set(this.query, "pageNo", 1);
    //    this.list=[];
    //   this.getQiMoGoodsList();
    // },
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
  // position: fixed;
  // left: 0;
  // top:0;
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

  // align-items: center;
  .header-search {
    // flex-shrink: 0;
    // width: 70%;
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
  padding-top: 50px;
  padding-bottom: 50px;
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
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  // border-top: 1px solid #eee;
  background: #b6babe;
  .footer-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    /deep/ .van-icon {
      font-size: 18px;
    }
    span {
      font-size: 12px;
    }
  }

  .footer-tabs {
    height: 100%;
    /deep/ .van-tabs__wrap {
      height: 100%;
      .van-tab {
        font-size: 16px;
      }
      .van-tab--active {
        color: #4a90e2;
        font-size: 16px;
        font-weight: bolder;
      }
      .van-tabs__line {
        background: transparent;
      }
      .van-tabs__nav--line {
        padding-bottom: 0;
      }
    }
    /deep/ .van-tabs__content {
      font-size: 12px;
      display: none;
    }
  }
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

.card-img {
  margin-bottom: auto;
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 4px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.card-all-box {
  background-color: #fafafa;

  .card-style {
    display: flex;
    align-items: stretch;
    position: relative;
    box-sizing: border-box;
    padding: 8px 16px;

    color: #323233;
    font-size: 12px; /*no */
    background-color: #fafafa;
    margin-top: 8px;
    .card-img {
      margin-bottom: auto;
      flex-shrink: 0;
      width: 88px;
      height: 88px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 4px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .card-name {
      flex-shrink: 0;
      width: 25%;
      flex: 1;
      box-sizing: border-box;
      padding-left: 3px;
      padding-left: 5px;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .card-detail {
      flex-shrink: 0;
      width: 25%;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .card-btn {
      flex-shrink: 0;
      // width: 25%; /*no*/
      min-width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;

      .btn-drap {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px; /*no*/
      }
      /deep/ .van-icon {
        font-size: 14px; /*no*/
      }
      // /deep/ .van-icon {
      //   color: #1989fa;
      //   font-size: 12px; /*no*/
      // }
      .btn-icon {
        border: 1px solid #1989fa; /*no*/
        margin-top: 15px; /*no*/
        width: 60px; /*no*/
        box-sizing: border-box;
        padding: 2px 0; /*no*/
        display: flex;
        justify-content: center;
        position: relative;
        transition: all 0.3s;
        font-size: 16px; /*no*/
        span {
          margin-right: 5px; /*no*/
          font-size: 12px; /*no*/
          color: #1989fa;
        }
        // /deep/ .van-icon {
        //   transform: rotate(90deg);
        //   color: #1989fa;
        //   font-size: 12px; /*no*/
        // }
      }
      .btn-icon-up {
        span {
          margin-right: 5px; /*no*/
          font-size: 12px; /*no*/
          color: #1989fa;
        }
        /deep/ .van-icon {
          transform: rotate(-90deg);
          color: #1989fa;
          font-size: 12px; /*no*/
        }
      }
    }
  }
  .card-drag {
    width: 80%;
    margin: 0 auto;
    max-height: 0;
    overflow: hidden;

    transition: max-height 0.6s;
    -moz-transition: max-height 0.6s; /* Firefox 4 */
    -webkit-transition: max-height 0.6s; /* Safari 和 Chrome */
    -o-transition: max-height 0.6s; /* Opera */
    /deep/ .van-card {
      margin: 0 auto;
    }
  }
  .card-drag-show {
    max-height: 100px;
    height: auto;
  }
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
