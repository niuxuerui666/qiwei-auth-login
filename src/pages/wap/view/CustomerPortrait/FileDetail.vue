<template>
  <div>
    <div class="content">
      <div class="groupcontent">
        <div class="group">
          <div class="headImg"><img src="../../assets/u101.jpg" alt="" /></div>
          <div class="groupname">
            <span class="u-weixin">{{
              mainMember.name ? mainMember.name : "身体健康群"
            }}</span>
          </div>
        </div>
        <!-- 建群时间 -->
        <div class="buildDate">
          <span class="b-span1">建群时间：</span>
          <span class="b-span2">{{
            mainMember.group_create_time ? mainMember.group_create_time : "-"
          }}</span>
        </div>
      </div>
      <!-- 灰条 -->
      <div class="gray_line"></div>
      <div class="label">
        <span class="l-span1"></span>
        <span class="l-span2">群内成员</span>
      </div>
      <!-- 灰线 -->
      <div class="gray_lines"></div>
      <div class="member">
        <table>
          <tr>
            <td width="72px" height="72px">
              <img :src="mainMember.avatar ? mainMember.avatar : defaultUrl" />
            </td>
            <td width="273px">
              <div class="main-member">
                <div class="main-member-name">
                  <span>{{
                    mainMember.the_main ? mainMember.the_main : "-"
                  }}</span>
                  <span v-if="mainMember.type == '1'" class="cbox-dst"
                    >@德生堂</span
                  >
                  <span v-if="mainMember.type == '2'" class="cbox-wechat"
                    >@微信</span
                  >
                </div>
                <div class="main-member-btn">群主</div>
              </div>
            </td>
          </tr>
          <tr v-for="item in memberList" :key="item.join_time">
            <td width="72px" height="72px">
              <img :src="item.avatar ? item.avatar : defaultUrl" />
            </td>
            <td width="273px">
              <div class="simple-member">
                <div class="simple-member-name">
                  <span>{{ item.user_name ? item.user_name : "-" }}</span>
                  <span v-if="item.type == '1'" class="cbox-dst">@德生堂</span>
                  <span v-if="item.type == '2'" class="cbox-wechat">@微信</span>
                </div>
                <div class="simple-member-btn">
                  <span>{{ item.join_time }}</span
                  ><span>成员直接邀请入群</span>
                </div>
              </div>
            </td>
          </tr>
        </table>
        <!-- 没有更多了 -->
        <div class="nomove">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
import { getWechatDetail } from "../../api";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      defaultUrl: require("../../assets/yisheng.png"), //默认头像
      memberList: [], //保存成员信息
      mainMember: {}, //群主信息
    };
  },
  created() {
    this.toGetWechatDetail(this.$route.query.chatId);
  },
  methods: {
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 获取群聊详情
    toGetWechatDetail(groupId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        // chat_id: "wrcXsxDgAAjxf1Xbpq-b-TcFw-SV3sVw", //写死数据
        chat_id: groupId, //
        timestamp,
        sign,
      };
      getWechatDetail(query)
        .then((res) => {
          console.log(res);
          if (res.code == "1") {
            this.memberList = res.data;
            this.mainMember = this.memberList[0];
            this.memberList.forEach((item,index) => {
              if (item.the_main == item.user_name) {
                this.mainMember = item;
                this.memberList.splice(index,1);
              }
            });
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
  // 内容区
  .groupcontent {
    padding: 10px;
    .group {
      width: 100%;
      display: flex;
      .headImg {
        width: 80px;
        height: 80px;
        img {
          width: 80px;
          height: 80px;
          vertical-align: top;
          border-radius: 5px;
        }
      }
      .groupname {
        min-width: 160px;
        font-size: 14px;
        line-height: 27px;
        .u-weixin {
          margin-left: 10px;
        }
      }
    }
    // 建群时间
    .buildDate {
      font-size: 12px;
      margin: 10px 0;
      .b-span1 {
        color: #888;
      }
    }
  }
  // 灰条样式
  .gray_line {
    width: 100%;
    height: 8px;
    background-color: #f2f2f2;
  }
  // 灰线样式
  .gray_lines {
    width: 100%;
    height: 1px;
    background-color: #f2f2f2;
  }
  .member {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    tr {
      padding: 10px;
      font-size: 12px;
      vertical-align: top;
      background-color: #fff;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .main-member {
      width: 100%;
      overflow-x: hidden;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      .main-member-name {
        margin-left: 8px;
        .cbox-dst {
          color: #ffb039;
        }
        .cbox-wechat {
          color: #7ed321;
        }
      }
      .main-member-btn {
        width: 35px;
        margin-right: 8px;
        text-align: center;
        border: 1px solid black;
        border-radius: 4px;
      }
    }
    // 群内成员
    .simple-member {
      padding: 8px;
      overflow-x: hidden;
      width: 100%;
      span {
        line-height: 24px;
        display: inline-block;
      }
      .simple-member-name {
        line-height: 30px;
        .cbox-dst {
          color: #ffb039;
        }
        .cbox-wechat {
          color: #7ed321;
        }
      }
      .simple-member-btn {
        line-height: 30px;
        span {
          color: #888;
        }
        span:first-child {
          margin-right: 20px;
        }
      }
    }
  }
}

// 会员标签
.label {
  width: 100%;
  padding: 0 10px;
  background-color: #fff;
  line-height: 30px;
  display: flex;
  align-items: center;
  .l-span1 {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #4a90e2;
    vertical-align: middle;
  }
  .l-span2 {
    font-size: 15px;
    margin-left: 6px;
  }
}
// 没有更多了
.nomove {
  font-size: 12px;
  width: 100%;
  color: #888;
  text-align: center;
  margin: 10px 0 120px 0;
}
</style>