<template>
  <div>
    <child>
      <span class="l-span2">更多回访</span>
    </child>
    <div class="content">
      <!-- 回访表 -->
      <div
        class="return-list"
        v-if="returnVisitList && returnVisitList.length == 0"
      >
        <span class="return-list_span">该成员暂无回访</span>
      </div>
      <div class="return-list" v-else>
        <van-list
          finished-text="没有更多了"
          @load="onLoad"
          v-model="loading"
          :finished="finished"
        >
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
                      <span v-if="item.content === 9"
                        >商品会员生命周期回访</span
                      >
                      <span v-if="item.content === 10">阿胶回访</span>
                    </p>
                  </td>
                  <td>
                    姓名：{{
                      archivesName && archivesName ? archivesName : "-"
                    }}
                  </td>
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
        </van-list>
      </div>
    </div>
    <!-- 回访记录详情弹框 -->
    <div class="return-wrapper" v-if="isShowReturnDetail"> 
      <div class="return-block">
        <div class="close-return" @click="closeReturn">
          <span>&times;</span>
        </div>
        <div class="return-header"><span>回访详情</span></div>
        <div class="return-table">
          <table>
            <tr>
              <td width=45%>回访类型：</td>
              <td>
                <p>
                  <span v-if="returnDetail.content == '1'">健康照顾方案大方</span>
                  <span v-if="returnDetail.content == '2'">健康照顾方案小方</span>
                  <span v-if="returnDetail.content == '3'">慢病回访</span>
                  <span v-if="returnDetail.content == '4'">活动回访</span>
                  <span v-if="returnDetail.content == '5'">器械售后回访</span>
                  <span v-if="returnDetail.content == '6'">近效期回访</span>
                  <span v-if="returnDetail.content == '7'">久未交易回访</span>
                  <span v-if="returnDetail.content == '8'">新办会员回访</span>
                  <span v-if="returnDetail.content == '9'">商品会员生命周期回访</span>
                  <span v-if="returnDetail.content == '10'">阿胶回访</span>
                  <span v-if="returnDetail.content == null || ''">-</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>接通类型：</td>
              <td>
                <p>
                  <span v-if="returnDetail.through_type == '1'">接通</span>
                  <span v-if="returnDetail.through_type == '2'">拒接</span>
                  <span v-if="returnDetail.through_type == '3'">接通后挂断</span>
                  <span v-if="returnDetail.through_type == '4'">停机</span>
                  <span v-if="returnDetail.through_type == '5'">关机</span>
                  <span v-if="returnDetail.through_type == '6'">无法接通</span>
                  <span v-if="returnDetail.through_type == '7'">无人接听</span>
                  <span v-if="returnDetail.through_type == '8'">空号</span>
                  <span v-if="returnDetail.through_type == '9'">号码有误</span>
                  <span v-if="returnDetail.through_type == null || ''">-</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>创建时间：</td>
              <td>{{ returnDetail.create_date }}</td>
            </tr>
            <tr>
              <td>患者姓名：</td>
              <td>{{ archivesName }}</td>
            </tr>
            <tr>
              <td>回访方式：</td>
              <td>
                <p v-if="returnDetail.visitway == '1'">电话回访</p>
                <p v-if="returnDetail.visitway == '2'">微信回访</p>
                <p v-if="returnDetail.visitway == null || ''">-</p>
              </td>
            </tr>
            <tr>
              <td>有无监测器械：</td>
              <td>
                <p v-if="returnDetail.is_detection=='1'">有监测器械</p>
                <p v-if="returnDetail.is_detection=='0'">无监测器械</p>
                <p v-if="returnDetail.is_detection==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>是否长期服药：</td>
              <td>
                <p v-if="returnDetail.is_medicine=='1'">是</p>
                <p v-if="returnDetail.is_medicine=='0'">否</p>
                <p v-if="returnDetail.is_medicine==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>有无不良反应：</td>
              <td>
                <p v-if="returnDetail.has_adversereactions=='1'">有</p>
                <p v-if="returnDetail.has_adversereactions=='2'">无</p>
                <p v-if="returnDetail.has_adversereactions==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>服药依从性：</td>
              <td>
                <p v-if="returnDetail.medcompliance=='1'">规律</p>
                <p v-if="returnDetail.medcompliance=='2'">间断</p>
                <p v-if="returnDetail.medcompliance=='3'">不服药</p>
                <p v-if="returnDetail.medcompliance==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>病情缓解情况：</td>
              <td>
                <p v-if="returnDetail.situation=='1'">缓解</p>
                <p v-if="returnDetail.situation=='2'">无明显变化</p>
                <p v-if="returnDetail.situation=='3'">加重</p>
                <p v-if="returnDetail.situation==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>自我监测：</td>
              <td>
                <p v-if="returnDetail.selfmonitoring=='1'">是</p>
                <p v-if="returnDetail.selfmonitoring=='2'">否</p>
                <p v-if="returnDetail.selfmonitoring==null||''">-</p>
              </td>
            </tr>
            <tr>
              <td>日均吸氧时间：</td>
              <td>{{returnDetail.oxygeninhalation_time?returnDetail.oxygeninhalation_time:'-'}}</td>
            </tr>
            <tr>
              <td>脉搏：</td>
              <td>{{returnDetail.pulse?returnDetail.pulse:'-'}}</td>
            </tr>
            <tr>
              <td>餐前血糖：</td>
              <td>{{returnDetail.before_bloodsugar?returnDetail.before_bloodsugar:'-'}}</td>
            </tr>
            <tr>
              <td>餐后血糖：</td>
              <td>{{returnDetail.after_bloodsugar?returnDetail.after_bloodsugar:'-'}}</td>
            </tr>
            <tr>
              <td>高压值：</td>
              <td>{{returnDetail. bloodpressure_h?returnDetail. bloodpressure_h:'-'}}</td>
            </tr>
            <tr>
              <td>低压值：</td>
              <td>{{returnDetail.bloodpressure_l?returnDetail.bloodpressure_l:'-'}}</td>
            </tr>
            <tr>
              <td>不满意描述：</td>
              <td>{{returnDetail.meet_describe?returnDetail.meet_describe:'-'}}</td>
            </tr>
            <tr>
              <td>意见描述：</td>
              <td>{{returnDetail.opinion_describe?returnDetail.opinion_describe:'-'}}</td>
            </tr>
            <tr>
              <td>医生结论：</td>
              <td>{{returnDetail.doctorconclusion?returnDetail.doctorconclusion:'-'}}</td>
            </tr>
            <tr>
              <td>回访小结：</td>
              <td>{{returnDetail.summary?returnDetail.summary:'-'}}</td>
            </tr>
          </table>
        </div>
        <!-- <div class="return-content">
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
import { Toast } from "vant";
import { getReturnList } from "../../api";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      recodeId: "", //档案ID
      returnVisitList: [], //回访列表
      finished: false, //判断是否加载完成
      loading: false, //
      pageNo: 1, //页码
      archivesName:"",//回访人
      isShowReturnDetail: false, //控制显示回访详情
    };
  },
  created() {
    this.recodeId = this.$route.query.recodeId;
    this.archivesName = this.$route.query.archivesName;
    this.togetReturnVisitList(true, this.recodeId);
  },
  methods: {
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 显示五条回访记录 archives_id传入档案ID
    // togetReturnVisitList(recordId) {
    //   var timestamp = new Date().getTime();
    //   var sign = this.getSign(timestamp);
    //   var query = {
    //     method: "getUserFamilyVisitListService",
    //     record_id: "249", //写死数据
    //     // record_id: recordId,
    //     page: "1",
    //     pageSize: "5",
    //     timestamp,
    //     sign,
    //   };
    //   getReturnList(query)
    //     .then((res) => {
    //       if (res.statusCode === "1") {
    //         this.returnVisitList = res.dataList;
    //       }
    //     })
    //     .catch((err) => {});
    // },
    // 关闭回访弹框
    closeReturn() {
      this.isShowReturnDetail = false;
    },
    // 弹窗展示回访详情
    toPopupReturn(obj) {
      this.returnDetail = obj;
      this.isShowReturnDetail = true;
      console.log(this.isShowReturnDetail, "this.issh");
    },
    onLoad() {
      this.togetReturnVisitList(true, this.recodeId);
    },
    // 触底加载更多
    togetReturnVisitList(more, recordId) {
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
      getReturnList(query).then((res) => {
        this.loading = false;
        // this.finished = true;
        if ((res.statusCode = 1)) {
          if (res.dataList && res.dataList.length > 0) {
            if (!more) {
              this.returnVisitList = res.dataList;
            }
            if (more) {
              this.returnVisitList = this.returnVisitList.concat(res.dataList);
            }
            this.finished = false;
          } else {
            this.finished = true;
          }
        }
      });
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
// 回访弹框样式
.return-wrapper {
  position: fixed;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .return-block {
    width: 100%;
    height: 90%;
    overflow-y: auto;
    background-color: #fff;
    padding: 10px;
    .close-return {
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
    .return-header {
      width: 100%;
      height: 30px;
      font-size: 15px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 1px dashed #ebedf0;
    }
    .return-table {
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
  }
}

// 回访列表
.return-list {
  width: 100%;
  height: 100%;
  padding: 50px 0;
  .return-list_span {
    font-size: 12px;
    color: #aaa;
  }
  .return-visit {
    width: 345px;
    margin: 10px auto;
    font-size: 12px;
    border-radius: 8px;
    box-shadow: 0 0 4px #0000001a;
    background-color: #fff;
    .visithead {
      width: 100%;
      height: 30px;
      box-sizing: border-box;
      padding: 0 8px;
      border-bottom: 1px dashed #ebedf0;
      background-color: #f1f1f1;
      display: flex;
      justify-content: space-between;
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
      padding: 0 8px;
      box-sizing: border-box;
    }
    table {
      width: 100%;
      td {
        height: 35px;
      }
    }
  }
}
</style>