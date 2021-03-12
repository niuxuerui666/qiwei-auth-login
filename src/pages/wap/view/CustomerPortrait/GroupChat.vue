<template>
  <div>
    <!-- 群聊信息 -->
    <child>
      <span class="l-span2">TA的添加</span>
    </child>
    <!-- 员工信息 -->
    <div class="content">
      <div class="customer">
        <div class="label">
          <span class="l-span1"></span>
          <span class="l-span2">TA添加的成员</span>
        </div>
        <table>
          <tr v-for="item in costomerList" :key="item.user_id">
            <td width="62px">
              <img :src="defaultUrl" />
            </td>
            <td>
              <div class="cbox user-box1">
                <span>{{ item.user_name }}</span>
                <span v-if="item.type === '1'" class="cbox-dst">@德生堂</span>
                <span v-if="item.type === '2'" class="cbox-wechat">@微信</span>
              </div>
              <div class="cbox user-box2">添加时间：{{ item.create_time }}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="group">
        <div class="label">
          <span class="l-span1"></span>
          <span class="l-span2">TA所在的群聊</span>
        </div>
        <!-- 群聊信息 -->
        <table>
          <tr v-for="item in groupList" :key="item.join_time">
            <td width="62px">
              <img :src="groupUrl" />
            </td>
            <td>
              <div class="gbox group-box1">
                {{ item.name ? item.name : "默认群名称" }}
              </div>
              <div class="gbox group-box2">群主：{{ item.user_name }}</div>
              <div class="gbox group-box3">入群时间：{{ item.join_time }}</div>
              <!-- <div class="group-box4">我已在群聊</div> -->
            </td>
          </tr>
        </table>
        <!-- 撑开高度 -->
        <div class="vain"></div>
        <!-- 没有更多了 -->
        <div class="nomore">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      costomerList: [], //保存用户列表
      groupList: [], //保存群组列表
      defaultUrl: require("../../assets/yisheng.png"), //默认头像
      groupUrl: require("../../assets/u101.jpg"),
    };
  },
  created() {
    this.costomerList = this.$route.query.customer
      ? this.$route.query.customer
      : [];
    this.groupList = this.$route.query.group ? this.$route.query.group : [];
    console.log(this.costomerList);
    console.log(this.groupList);
  },
  methods: {
    // // 跳转详情页
    // toDetail() {
    //   this.$router.push("/FileDetail");
    // },
  },
};
</script>

<style lang="scss" scoped>
/* 员工信息 */
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 12px;
  .customer,
  .group {
    table {
      width: 100%;
      padding: 0 15px;
    }
  }
  tr {
    margin: 10px 0;
    img {
      width: 46px;
      height: 46px;
    }
  }
  .cbox {
    line-height: 28px;
    .cbox-dst {
      color: #ffb039;
    }
    .cbox-wechat {
      color: #7ed321;
    }
  }
  .user-box2 {
    color: #999999;
  }
  .gbox {
    line-height: 19px;
  }
  .group-box2,
  .group-box3 {
    color: #999;
  }
  .group-box4 {
    border: 1px solid #3399ff;
    border-radius: 5px;
    color: #3399ff;
    line-height: 20px;
    width: 100px;
    text-align: center;
  }
  .group-box5 {
    border: 1px solid #9999996c;
    border-radius: 5px;
    color: #999;
    line-height: 20px;
    width: 100px;
    text-align: center;
  }
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
.nomore {
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  margin: 20px 0 140px 0;
}
.noperson {
  width: 100%;
  text-align: center;
  font-size: 13px;
  line-height: 19px;
  margin: 10px auto;
}
</style>