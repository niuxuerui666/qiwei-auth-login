<template>
  <div>
    <div class="content">
      <!-- 回访表 -->
      <div
        class="return-list"
        v-if="returnVisitList && returnVisitList.length == 0"
      >
        <span class="return-list_span">该成员暂无回访</span>
      </div>
      <div class="return-list" v-else>
        <div
          class="return-visit"
          v-for="item in returnVisitList"
          :key="item.create_date"
          @click="toPopupReturn(item)"
        >
          <div class="visithead">
            <p class="visit_p1">回访时间：{{ item.visit_date }}</p>
            <p class="visit_p2">回访人：{{ item.revisiter }}</p>
          </div>
          <div class="visitable">
            <table>
              <tr>
                <td width="55%">
                  <p>
                    <span>回访类型：</span>
                    <span v-if="item.content === 1">健康照顾方案大方</span>
                    <span v-if="item.content === 2">健康照顾方案小方</span>
                    <span v-if="item.content === 3">慢病回访</span>
                    <span v-if="item.content === 4">活动回访</span>
                    <span v-if="item.content === 5">器械售后回访</span>
                    <span v-if="item.content === 6">近效期回访</span>
                    <span v-if="item.content === 7">久未交易回访</span>
                    <span v-if="item.content === 8">新办会员回访</span>
                    <span v-if="item.content === 9">商品会员生命周期回访</span>
                    <span v-if="item.content === 10">阿胶回访</span>
                  </p>
                </td>
                <td>姓名：{{ archivesName }}</td>
              </tr>
              <tr>
                <td>
                  <p>
                    健康问题：{{
                      item.healthproblem ? item.healthproblem : "身体健康"
                    }}
                  </p>
                </td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getRecipeList} from '../../api'
export default {
  data(){
    return{
      recodeId:"",//档案ID
      returnVisitList:[],//回访列表
    }
  },
  created(){
    this.recodeId = this.$route.query.recodeId;
    this.togetReturnVisitList(this.recodeId);
  },
  methods:{
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 显示五条回访记录 archives_id传入档案ID
    togetReturnVisitList(recordId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getUserFamilyVisitListService",
        record_id: "249", //写死数据
        // record_id: recordId,
        page: "1",
        pageSize: "5",
        timestamp,
        sign,
      };
      getRecipeList(query)
        .then((res) => {
          if (res.statusCode === "1") {
            this.returnVisitList = res.dataList;
          }
        })
        .catch((err) => {
        });
    },
  }
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
// 回访弹框样式
.return-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .return-block {
    width: 100%;
    height: 90%;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
  }
}

// 回访列表
.return-list {
  width: 100%;
  background-color: #f7f8fa;
  overflow: hidden;
  .return-list_span {
    font-size: 12px;
    color: #aaa;
  }
  .return-visit {
    width: 80%;
    margin: 10px auto;
    font-size: 12px;
    border-radius: 8px;
    box-shadow: 0 0 4px #0000001a;
    background-color: #fff;
    .visithead {
      width: 100%;
      height: 30px;
      border-bottom: 1px dashed #ebedf0;
      background-color: #f1f1f1;
      display: flex;
      justify-content: space-around;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 30px;
      }
      .visit_p1 {
        width: 50%;
      }
      .visit_p2 {
        width: 30%;
      }
    }
    .visitable {
      width: 100%;
      box-sizing: border-box;
    }
    table {
      width: 100%;
      td {
        text-align: center;
        height: 35px;
      }
    }
  }
}
</style>