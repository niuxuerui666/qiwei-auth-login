<template>
  <div>
    <child>
      <span class="l-span2">更多处方</span>
    </child>
    <div class="content">
      <!-- <van-empty v-if="finished2 && list2.length == 0" description="" /> -->
      <div class="recipe_list" v-if="recipeList && recipeList.length == 0">
        <span class="recipe_list_span">该成员暂无处方</span>
      </div>
      <div class="recipe_list" v-else>
        <van-list
          finished-text="没有更多了"
          @load="onLoad"
          v-model="loading"
          :finished="finished"
        >
          <div
            class="recipe_list_box"
            v-for="item in recipeList"
            :key="item.remote_id"
            @click="toPopupRecipe(item.remote_num)"
          >
            <div class="recipe_box_header"></div>
            <table>
              <tr>
                <td width="60%">编码：{{ item.remote_num }}</td>
                <td>
                  <p>医生：{{ item.doctor_name }}</p>
                </td>
              </tr>
              <tr>
                <td>时间：{{ item.remote_date }}</td>
                <td>
                  <p>诊断：{{ item.diagnosis_content }}</p>
                </td>
              </tr>
            </table>
          </div>
        </van-list>
      </div>
      <!-- 处方记录列表 -->
      <!-- <div class="recipe_list" v-if="recipeList && recipeList.length == 0">
        <span class="recipe_list_span">该成员暂无处方</span>
      </div>
      <div class="recipe_list" v-else>
        <div
          class="recipe_list_box"
          v-for="item in recipeList"
          :key="item.remote_id"
          @click="toPopupRecipe(item.remote_num)"
        >
          <div class="recipe_box_header"></div>
          <table>
            <tr>
              <td width="60%">编码：{{ item.remote_num }}</td>
              <td>
                <p>医生：{{ item.doctor_name }}</p>
              </td>
            </tr>
            <tr>
              <td>时间：{{ item.remote_date }}</td>
              <td>
                <p>诊断：{{ item.diagnosis_content }}</p>
              </td>
            </tr>
          </table>
        </div>
      </div> -->
    </div>
    <!-- 处方记录详情弹框 -->
    <div class="recipe-wrapper" v-if="isShowArchiveDetail">
      <div class="recipe-block">
        <div class="close-recipe" @click="closeRicipe">
          <span>&times;</span>
        </div>
        <div class="recipe-header"><span>处方笺</span></div>
        <div class="recipe-table1">
          <table>
            <tr>
              <td>处方编号:</td>
              <td>
                {{ archiveDetail.remoteNum ? archiveDetail.remoteNum : "-" }}
              </td>
            </tr>
            <tr>
              <td>开方时间：</td>
              <td>{{ archiveDetail.birthDate }}</td>
            </tr>
            <tr>
              <td>患者姓名：</td>
              <td>{{ archiveDetail.realName }}</td>
            </tr>
            <tr>
              <td>性别：</td>
              <td>{{ archiveDetail.doctor }}</td>
            </tr>
            <tr>
              <td>年龄：</td>
              <td>{{ archiveDetail.age }}</td>
            </tr>
          </table>
        </div>
        <div class="recipe-content">
          <p class="content-p1">处方明细：</p>
          <div
            class="content-div"
            v-for="item in archiveDetail.listItem"
            :key="item.goodsName"
          >
            <div class="r-c-head">
              <div class="head-name">{{ item.goodsName }}</div>
              <div class="head-sum">
                &times;{{ item.goodsCount ? item.goodsCount : "1" }}
              </div>
            </div>
            <div class="r-c-body">{{ item.goodsSpec }}</div>
            <div class="r-c-foot">
              <span>用法用量：{{ item.usage }}</span>
            </div>
          </div>
        </div>
        <div class="recipe-table2">
          <table>
            <tr>
              <td>科室：</td>
              <td>{{ archiveDetail.category }}</td>
            </tr>
            <tr>
              <td>处方医生：</td>
              <td><img :src="archiveDetail.docImg" /></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
import { getRecipeList, getRecipeDetail } from "../../api";
import { Toast } from "vant";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      recodeId: "", //档案ID
      recipeList: [], //保存处方列表
      isShowArchiveDetail: false, //控制显示处方详情
      finished: false, //判断是否加载完成
      loading: false, //
      pageNo: 1, //页码
    };
  },
  created() {
    this.recodeId = this.$route.query.recodeId;
    this.getQiMoRecipeList(true, this.recodeId);
  },
  methods: {
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    onLoad() {
      this.getQiMoRecipeList(true, this.recodeId);
    },
    // 触底加载更多
    getQiMoRecipeList(more, recordId) {
      if (more) {
        if (!this.finished) {
          this.pageNo = this.pageNo + 1;
        }
      }
      Toast.loading({ message: "加载中...", duration: 600 });
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getUserFamilyRemoteListService",
        record_id: "249", //写死数据
        // record_id: recordId,
        page: this.pageNo,
        pageSize: "10",
        timestamp,
        sign,
      };
      getRecipeList(query).then((res) => {
        this.loading = false;
        // this.finished = true;
        if ((res.statusCode = 1)) {
          if (res.dataList && res.dataList.length > 0) {
            if (!more) {
              this.recipeList = res.dataList;
            }
            if (more) {
              this.recipeList = this.recipeList.concat(res.dataList);
            }
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });
    },
    // 弹窗展示处方详情
    toPopupRecipe(rId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getRemotePrescriptionServiceHD",
        remoteNum: rId, //写死数据
        // record_id: recordId,
        timestamp,
        sign,
      };
      getRecipeDetail(query)
        .then((res) => {
          this.isShowArchiveDetail = true; // 显示弹框
          if (res.statusCode === "1") {
            this.archiveDetail = res.data;
          }
        })
        .catch((err) => {});
    },
    // 点击关闭弹框
    closeRicipe() {
      this.isShowArchiveDetail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
// 处方记录列表
.recipe_list {
  width: 100%;
  height: 100%;
  padding: 50px 0;
  .recipe_list_span {
    font-size: 12px;
    color: #aaa;
  }
  .recipe_list_box {
    width: 345px;
    margin: 10px auto;
    font-size: 12px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    .recipe_box_header {
      width: 100%;
      height: 25px;
      box-sizing: border-box;
      border-bottom: 1px dashed #ebedf0;
    }
    table {
      width: 100%;
      margin: 0 auto;
      tr {
        height: 40px;
        td {
          text-align: center;
        }
      }
    }
  }
}
// 处方弹框样式
.recipe-wrapper {
  position: fixed;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .recipe-block {
    width: 100%;
    height: 90%;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
    .close-recipe {
      position: fixed;
      right: 10px;
      span {
        width: 15px;
        height: 15px;
        font-size: 16px;
        line-height: 15px;
        text-align: center;
        border-radius: 50%;
        border: 1px solid #bbb;
        color: #bbb;
        display: block;
      }
    }
    .recipe-header {
      width: 100%;
      height: 30px;
      font-size: 15px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 1px dashed #ebedf0;
    }
    .recipe-table1,
    .recipe-table2 {
      width: 100%;
      font-size: 12px;
      tr {
        height: 30px;
        td {
          line-height: 30px;
          img {
            width: 20%;
          }
        }
      }
    }
    .recipe-content {
      margin: 30px auto;
      .content-p1 {
        line-height: 40px;
        font-size: 13px;
      }
      .content-div {
        width: 96%;
        margin: 3px auto;
        font-size: 12px;
        color: #757575;
        border-bottom: 1px dashed #ebedf0;
        .r-c-head {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>