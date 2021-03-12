<template>
  <div v-cloak>
    <!-- 等待接口加载 -->
    <div class="waiting" v-if="user_type === '' || null">
      <loading></loading>
    </div>
    <!-- 接口加载完毕 -->
    <div v-else>
      <!-- 企微用户 -->
      <div v-if="user_type === '2'">
        <img src="'../../assets/microimg.jpg'" />
      </div>
      <!-- 微信用户 -->
      <div v-else>
        <!-- 客户不是会员 -->
        <div class="notNumber" v-if="memberId === '' || null">
          <div @click="toSendUpGrade"><img :src="upGradeUrl" /></div>
        </div>
        <!-- 客户是会员 -->
        <div v-else>
          <div class="header-label">
            <div class="labels">
              <span class="l-span1"></span>
              <span class="l-span2">基础属性</span>
            </div>
            <!-- 灰条 -->
            <div class="gray_lines"></div>
          </div>
          <!-- <div class="header">
          <p
            v-for="(item, index) in sumObj"
            :key="item.id"
            @click="toJump(item.id, index)"
            :class="sumIndex == index ? 'active' : ''"
          >
            {{ item.title }}
          </p>
        </div> -->
          <!-- @scroll="toScroll" 第一版不用 -->
          <div class="maincontent" ref="mainScroll">
            <!-- 个人信息块 -->
            <div class="content" id="baseStr">
              <div class="user">
                <div class="headImg">
                  <img :src="avatarUrl ? avatarUrl : defaultUrl" alt="" />
                  <!-- <van-image
                  width="56"
                  height="56"
                  fit="cover"
                  src="../../assets/login-bg.jpg"
                /> -->
                </div>
                <div class="userName">
                  {{ userInfo.Name }}
                  <span class="u-weixin">@微信</span>
                  <div class="u-sex">
                    <img
                      :src="userInfo.Gender__c == '男' ? manUrl : womanUrl"
                    />
                  </div>
                </div>
                <div class="bulid" @click="toBuild()">一键建群</div>
              </div>
              <!-- 基本信息 -->
              <div class="user_info">
                <table>
                  <tr>
                    <td>
                      <span>会员卡号：</span
                      >{{
                        userInfo.MobilePhone__c ? userInfo.MobilePhone__c : "-"
                      }}
                    </td>
                    <td>
                      <span>年龄：</span
                      >{{ userInfo.Age__c ? userInfo.Age__c : "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>家庭住址：</span
                      >{{ userInfo.Address__c ? userInfo.Address__c : "-" }}
                    </td>
                    <td>
                      <span>职业：</span
                      >{{ userInfo.Career__c ? userInfo.Career__c : "-" }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>手机号：</span>{{ userPhone ? userPhone : "-" }}
                    </td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <!-- 分割线 -->
              <div class="user_line"></div>
              <!-- 已添加企微 -->
              <div class="addmicro">
                <img src="../../assets/u40.png" alt="" />
                <span
                  v-if="
                    sideInfo.userAddCustomer &&
                    sideInfo.userAddCustomer.length == 0
                  "
                  >未添加企微</span
                >
                <span v-else>已添加企微</span>
              </div>
              <div class="addUser">
                <div>
                  <span>TA添加了：</span>
                  <div
                    class="imgbox"
                    v-if="
                      sideInfo.userAddCustomer &&
                      sideInfo.userAddCustomer.length == 1
                    "
                  >
                    <img src="../../assets/u46.png" alt="" />
                  </div>
                  <div
                    class="imgbox"
                    v-if="
                      sideInfo.userAddCustomer &&
                      sideInfo.userAddCustomer.length >= 2
                    "
                  >
                    <img src="../../assets/u46.png" alt="" />
                    <img src="../../assets/u48.png" alt="" />
                  </div>
                  <span
                    >共{{
                      sideInfo.userAddCustomer &&
                      sideInfo.userAddCustomer.length
                        ? sideInfo.userAddCustomer.length
                        : "0"
                    }}个员工</span
                  >
                </div>
                <div @click="toGroup()">
                  共{{
                    sideInfo.userGroupOfData && sideInfo.userGroupOfData.length
                      ? sideInfo.userGroupOfData.length
                      : "0"
                  }}个群聊&nbsp;&gt;
                </div>
              </div>
              <!--  -->
              <div class="attention">
                <img src="../../assets/u89.png" />
                <span v-if="sideInfo.onileUser && sideInfo.onileUser.member_id"
                  >已注册线上会员</span
                >
                <span v-else>未注册线上会员</span>
              </div>
              <div class="attention">
                <img src="../../assets/u54.png" />
                <span v-if="oneAccount == null">未关注111公众号</span>
                <span v-else>已关注111公众号</span>
              </div>
              <div class="attention">
                <img src="../../assets/u54.png" />
                <span v-if="dstAccount == null">未关注德生堂公众号</span>
                <span v-else>已关注德生堂公众号</span>
              </div>
            </div>
            <!-- 灰条 -->
            <div class="gray_line"></div>
            <!-- 第二块标签区 -->
            <div class="content" id="vipLabel">
              <div class="header-label">
                <div class="label">
                  <span class="l-span1"></span>
                  <span class="l-span2">会员标签</span>
                </div>
              </div>
              <div class="label_list">
                <div class="noLabel" v-if="labelList && labelList.length == 0">
                  该会员暂无标签
                </div>
                <div class="list-box" v-for="item in labelList" :key="item.id">
                  {{ item.IllnessTag__c }}
                </div>
              </div>
            </div>
            <!-- 灰条 -->
            <!-- <div class="gray_line"></div> -->
            <!-- 家庭档案区 -->
            <!-- <div class="content" id="fileLabel">
        <div class="label">
          <span class="l-span1"></span>
          <span class="l-span2">家庭档案</span>
        </div>
        <div class="files">
          <table>
            <tr>
              <td width="72px">
                <img src="../../assets/u103.png" />
              </td>
              <td width="244px">
                <div>张毅</div>
                <div>关系：父母</div>
              </td>
              <td width="50px">
                <div class="f-detail" @click="toFile()">详情&nbsp;&gt;</div>
              </td>
            </tr>
            <tr>
              <td width="72px">
                <img src="../../assets/u103.png" />
              </td>
              <td width="244px">
                <div>张毅</div>
                <div>关系：父母</div>
              </td>
              <td width="50px">
                <div class="f-detail">详情&nbsp;&gt;</div>
              </td>
            </tr>
          </table>
        </div>
      </div> -->
            <!-- 灰条 -->
            <!-- <div class="gray_line"></div> -->
            <!-- 会员订单 -->
            <!-- <div class="content" id="userOrder">
            <div class="label">
              <span class="l-span1"></span>
              <span class="l-span2">会员订单</span>
            </div>
            <div class="order">
              <div class="o-head">
                <table>
                  <tr height="15px">
                    <td width="160px">
                      <span class="h-span1">订单编号：</span>
                      <span class="h-span2">17020101750</span>
                    </td>
                    <td>
                      <span class="h-span1">创建时间：</span>
                      <span class="h-span2">2021/12/12&nbsp;13:56:12</span>
                    </td>
                  </tr>
                  <tr>
                    <td width="160px">
                      <span class="h-span1">订单金额：</span>
                      <span class="h-span2">123.00</span>
                    </td>
                    <td></td>
                  </tr>
                </table>
              </div> -->
            <!-- 订单身体部分 -->
            <!-- <div class="o-body">
                <table>
                  <tr>
                    <td width="60px">1000021</td>
                    <td width="210px">连花清瘟胶囊0.25g&times;48片</td>
                    <td width="50px">&times;3盒</td>
                  </tr>
                  <tr>
                    <td width="60px">1000021</td>
                    <td width="235px">连花清瘟胶囊0.25g&times;48片</td>
                    <td width="50px">&times;3盒</td>
                  </tr>
                  <tr>
                    <td width="60px">1000021</td>
                    <td width="235px">连花清瘟胶囊0.25g&times;48片</td>
                    <td width="50px">&times;3盒</td>
                  </tr>
                </table>
              </div>
            </div>
          </div> -->
            <!-- 灰条 -->
            <!-- <div class="gray_line"></div> -->
            <!-- 跟进 -->
            <!-- <div class="content" id="followUp">
            <div class="label">
              <span class="l-span1"></span>
              <span class="l-span2">跟进记录</span>
            </div>
            <div>
              <div class="follow">
                <span>星期二</span>&nbsp;
                <span>2021-01-19</span>
              </div>
              <div class="follow-table">
                <table>
                  <tr>
                    <td width="58px">10:42</td>
                    <td>
                      <p class="d-p1">跟进记录</p>
                      <p class="d-p2">展示内容</p>
                      <p class="d-p3">由&nbsp;路红英&nbsp;添加</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="58px">10:41</td>
                    <td>
                      <p class="d-p1">跟进记录</p>
                      <p class="d-p2">展示内容</p>
                      <p class="d-p3">由&nbsp;张勋&nbsp;添加</p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="nomore">没有更多了</div>
          </div> -->
          </div>
          <!-- <div class="footer">
          <van-icon name="plus" />
          <p @click="toFollow()">添加跟进</p>
        </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCustomerInfo,
  getUserTypeId,
  getCustomerName,
  getSideWechatInfo,
} from "../../api/index.js";
import loading from "../loading/loading";
import { Notify, Dialog } from "vant";
export default {
  data() {
    return {
      // sumIndex: 0, //保存位置
      // sumArr: null, //保存距离
      manUrl: require("../../assets/man.jpg"), //本地性别男
      womanUrl: require("../../assets/woman.jpg"), //本地性别女
      upGradeUrl: require("../../assets/notgold.jpg"), //非会员图片
      sumObj: [
        //保存头部信息
        // { id: "baseStr", title: "基础属性" },
        // { id: "vipLabel", title: "会员标签" },
        // { id: "userOrder", title: "会员订单" },
        // { id: "followUp", title: "会员动态" },
      ],
      userInfo: {}, //保存会员信息
      avatarUrl: "", //用户头像
      defaultUrl: require("../../assets/login-bg.jpg"), //默认头像
      labelList: [], //保存会员标签
      userPhone: "", //保存隐藏的手机号
      memberId: "", //保存会员ID
      user_type: "", //保存用户类型
      sideInfo: {}, //用户有关企微的信息
      dstAccount: null, //德生堂公众号
      oneAccount: null, //111公众号
    };
  },
  components: {
    loading,
  },
  created() {
    this.getMemberId(this.$route.query.userId); //调用获取信息函数
    this.getAvatarUrl(this.$route.query.userId); //调用获取头像
    this.toGetSideWechatInfo(this.$route.query.userId); //调用获取侧边栏信息
    // var timestamp = new Date().getTime();
    // var sign = this.getSign(timestamp);
    // var query = {
    //   timestamp,
    //   sign,
    //   user_id: "wmcXsxDgAAMoI4YhKIhfUPP7WZcJE7cg",
    //   customer_id: "10004610",
    // };
    // getSideWechatInfo(query)
    //   .then((res) => {
    //     console.log(res, "测试");
    //     this.sideInfo = res.data;
    //     if (this.sideInfo.userBangDingData.length != 0) {
    //       this.sideInfo.userBangDingData.forEach((item) => {
    //         if (item.type == 1) {
    //           this.oneAccount = 1;
    //         } else if (item.type == 2) {
    //           this.dstAccount = 2;
    //         }
    //       });
    //     }
    //   })
    //   .catch((err) => {});
    // var querys = { userid: "wmcXsxDgAAKlZ9GhKkNMhK719tB8v_SQ" };
    // getCustomerName(querys).then((res) => {
    //   if (res.code == 0) {
    //     this.avatarUrl = res.data.avatar;
    //   } else {
    //     Notify({
    //       type: "error",
    //       message: "获取客户昵称失败！",
    //       duration: 800,
    //     });
    //   }
    // });
  },
  methods: {
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 获取头像
    getAvatarUrl(userId) {
      var query = { userid: userId };
      var that = this;
      getCustomerName(query).then((res) => {
        console.log(res.data, "用户信息");
        if (res.code == 0) {
          that.avatarUrl = res.data.avatar;
        } else {
          Notify({
            type: "error",
            message: "获取客户昵称失败！",
            duration: 800,
          });
        }
      });
    },
    // 获取企微侧边栏
    toGetSideWechatInfo(userId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        timestamp,
        sign,
        user_id: userId,
        customer_id: "10004610", //企微成员ID写死
      };
      getSideWechatInfo(query)
        .then((res) => {
          console.log(res, "测试");
          this.sideInfo = res.data;
          if (this.sideInfo.userBangDingData.length != 0) {
            this.sideInfo.userBangDingData.forEach((item) => {
              if (item.type == 1) {
                this.oneAccount = 1;
              } else if (item.type == 2) {
                this.dstAccount = 2;
              }
            });
          }
        })
        .catch((err) => {});
    },
    // 获取客户画像数据
    toGetCustomerInfo(userId) {
      getCustomerInfo({
        data: userId, //userid
        // data: '3238016', //userid
        type: 2, //1:mobilePhone(手机号) 2:memberid(会员ID) 3:userid
        // data: "wmcXsxDgAAKlZ9GhKkNMhK719tB8v_SQ", //客户写死
        // type: 3, //1:mobilePhone(手机号) 2:userId(会员ID) 3:企微userid
      })
        .then((res) => {
          this.userInfo = res.data.CustomerInfo;
          console.log(this.userInfo, "成功的回调！");
          this.labelList = this.userInfo.CustomerTags__r.records;
          this.hidePhone(this.userInfo.Phone);
          // 关于滚动的显示方法放到这里
          // this.getLength();
        })
        .catch((err) => {
          // alert("失败！");
          // alert(JSON.stringify(err));
        });
    },
    // 根据userID获取类型ID
    getMemberId(userid) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var that = this;
      var query = {
        user_id: userid,
        timestamp,
        sign,
      };
      getUserTypeId(query)
        .then((res) => {
          that.toGetCustomerInfo(res.data.member_id);
          that.memberId = res.data.member_id;
          this.user_type = res.data.user_type;
        })
        .catch((err) => {});
    },
    // 正则隐藏获取的手机号
    hidePhone(phone) {
      if (phone == "" || phone == null) {
        this.userPhone = "暂无电话";
        return;
      } else {
        this.userPhone = phone.replace(/(.{5}).*(.{3})/, "$1****$2");
      }
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
          function (res) {
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
    // 点击锚点跳转
    // toJump(idName, index) {
    //   document.querySelector("#" + idName).scrollIntoView(); //解决URL不拼接
    //   this.sumIndex = index;
    // },
    // toScroll() {
    //   //跟随滚动
    //   let sLength = this.$refs.mainScroll.scrollTop;
    //   if (sLength < this.sumArr[0]) {
    //     this.sumIndex = 0;
    //   } else if (sLength > this.sumArr[0] && sLength < this.sumArr[1]) {
    //     this.sumIndex = 1;
    //   } else if (sLength > this.sumArr[1] && sLength < this.sumArr[2]) {
    //     this.sumIndex = 2;
    //   } else if (sLength > this.sumArr[2] && sLength < this.sumArr[3]) {
    //     this.sumIndex = 3;
    //   } else if (sLength > this.sumArr[3] && sLength < this.sumArr[4]) {
    //     this.sumIndex = 4;
    //   }
    // },
    // // 获取dom节点的距离
    // getLength() {
    //   this.$nextTick(() => {
    //     this.sumArr = this.sumObj.map((item) => {
    //       return document.querySelector("#" + item.id).offsetTop + 30;
    //     });
    //   });
    // },
    // 跳转一键建群
    toBuild() {
      this.$router.push({ name: "AKeyBuildingGroup", params: { id: 10 } });
    },
    // 跳转群聊组
    toGroup() {
      if (this.sideInfo) {
        this.$router.push({
          path: "/GroupChat",
          query: {
            customer: this.sideInfo.userAddCustomer
              ? this.sideInfo.userAddCustomer
              : null,
            group: this.sideInfo.userGroupOfData
              ? this.sideInfo.userGroupOfData
              : null,
          },
        });
      }
    },
    // 跳转档案
    // toFile() {
    //   this.$router.push("/FamilyArchives");
    // },
    // 跳转跟进
    // toFollow() {
    //   this.$router.push("/FollowUp");
    // },
  },
};
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
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
.header-label {
  .labels {
    width: 345px;
    margin: 0 auto;
    line-height: 25px;
    border-bottom: 1px solid #eee;
    .l-span1 {
      display: inline-block;
      width: 4px;
      height: 13px;
      background-color: #4a90e2;
    }
    .l-span2 {
      font-size: 16px;
      margin-left: 6px;
    }
  }
}
// 非会员图片样式
.notNumber {
  img {
    width: 100%;
  }
}
.header {
  width: 345px;
  height: 30px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  background: #fff;
  top: 0px;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  p {
    line-height: 30px;
    display: block;
    color: black;
    cursor: pointer;
  }
  .active {
    color: #4a90e2;
  }
}
.maincontent {
  width: 100%;
  height: 580px;
  overflow-y: auto;
  position: fixed;
  top: 20px;
  z-index: 888;
  margin: 0 auto;
}
.content {
  width: 345px;
  margin: 0 auto;
}
.user {
  display: flex;
  margin-top: 10px;
  .headImg {
    margin-top: 10px;
    width: 56px;
    height: 56px;
    img {
      width: 56px;
      height: 56px;
    }
  }
  .userName {
    margin: 10px 0 0 15px;
    min-width: 160px;
    font-size: 15px;
    line-height: 27px;
    .u-weixin {
      color: #7ed321;
    }
    .u-sex {
      img {
        margin-top: 10px;
        width: 17px;
        height: 17px;
      }
    }
  }
  .bulid {
    margin: 10px 0 0 15px;
    border-radius: 5px;
    font-size: 12px;
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
  }
  .bulid:hover {
    background-color: #7ed321;
    cursor: pointer;
  }
}
// 用户信息
.user_info {
  font-size: 12px;
  table {
    td {
      height: 30px;
      width: 180px;
      span {
        color: #9b9b9b;
      }
    }
  }
}
// 分割线
.user_line {
  width: 100%;
  height: 1px;
  background-color: #9999995d;
  margin: 0 auto;
  transform: scaleY(0.5);
}
// 添加企微
.addmicro {
  font-size: 15px;
  margin: 8px 0;
  img {
    width: 29px;
    height: 25px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
.addUser {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  line-height: 30px;
  margin-bottom: 8px;
  .imgbox {
    overflow: hidden;
    display: inline-block;
    min-width: 15px;
    height: 13px;
    vertical-align: middle;
    margin-right: 8px;
    img {
      float: left;
      width: 13px;
      height: 13px;
      border-radius: 50%;
    }
  }

  span {
    color: #9b9b9b;
  }
}
// 判断是否关注
.attention {
  font-size: 12px;
  line-height: 30px;
  img {
    width: 15px;
    height: 15px;
    vertical-align: text-bottom;
    margin-right: 10px;
  }
}
// 灰条样式
.gray_line {
  width: 100%;
  height: 12px;
  background-color: #f2f2f2;
  margin-top: 40px;
}

// 会员标签
.label {
  line-height: 25px;
  border-bottom: 1px solid #eee;
  .l-span1 {
    display: inline-block;
    width: 4px;
    height: 13px;
    background-color: #4a90e2;
  }
  .l-span2 {
    font-size: 16px;
    margin-left: 6px;
  }
}
// 标签列表,内容撑开
.label_list {
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
  .noLabel {
    margin: 10px 0;
  }
  .list-box {
    padding: 3px 10px;
    background-color: #cce6ff;
    border: 1px solid #4a90e2;
    margin: 0 10px 10px 0;
    border-radius: 4px;
    min-width: 20px;
    height: 19px;
    line-height: 19px;
  }
}
// 家庭档案
.files {
  table {
    tr {
      margin-bottom: 8px;
    }
    td {
      img {
        width: 44px;
        height: 44px;
      }
      div {
        font-size: 12px;
        line-height: 28px;
      }
      .f-detail {
        color: #4a90e2;
      }
    }
  }
}
// 订单信息
.order {
  margin-bottom: 10px;
  .o-head {
    background-color: #edf5ff;
    border: 1px solid #d2e7ff;
    font-size: 10px;
    .h-span1 {
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
    border: 1px solid #d2e7ff;
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
// 跟进记录，时间
.follow {
  width: 100%;
  height: 36px;
  box-shadow: inset 0 -1px 0 0 #f2f2f2, inset 0 1px 0 0 #f2f2f2;
  color: #4a4a4a;
  font-size: 12px;
  line-height: 36px;
}
.follow-table {
  font-size: 12px;
  color: #4a4a4a;
  border: 1px solid #f2f2f2;
  border-top: none;
  tr {
    margin-top: 10px;
    height: 70px;
    td {
      vertical-align: top;
    }
  }
  .d-p2,
  .d-p3 {
    color: #9b9b9b;
  }
}
.nomore {
  font-size: 12px;
  line-height: 19px;
  color: #9b9b9b;
  text-align: center;
  margin: 20px 0 155px 0;
}
// 底部添加跟进
.footer {
  font-size: 12px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 44px;
  background-color: #fff;
  z-index: 999;
}
</style>
