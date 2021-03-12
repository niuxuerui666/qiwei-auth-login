<template>
  <div>
    <div class="header">
      <!-- 回访 -->
      <child>
        <span class="l-span2">新增回访</span>
      </child>
      <!-- 灰条 -->
      <div class="gray_line"></div>
    </div>
    <div class="content">
      <van-form>
        <van-field
          readonly
          clickable
          name="picker"
          :value="returnContentValue"
          label="回访内容:"
          placeholder="请选择"
          @click="returnContent = true"
        />
        <van-popup v-model="returnContent" position="bottom">
          <van-picker
            show-toolbar
            :columns="returnContentColumn"
            @confirm="getReturnContentValue"
            @cancel="returnContent = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="connectTypeValue"
          label="接通类型:"
          placeholder="请选择"
          @click="connectType = true"
        />
        <van-popup v-model="connectType" position="bottom">
          <van-picker
            show-toolbar
            :columns="connectTypeColumn"
            @confirm="getConnectTypeValue"
            @cancel="connectType = false"
          />
        </van-popup>
        <van-field
          v-model="medicineDrugUsing"
          name="用药禁忌"
          label="用药禁忌:"
          placeholder="请填写用药禁忌"
          :rules="[{ required: true, message: '请填写用药禁忌' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="illnessReleaseValue"
          label="病情缓解情况:"
          placeholder="请选择"
          @click="illnessRelease = true"
        />
        <van-popup v-model="illnessRelease" position="bottom">
          <van-picker
            show-toolbar
            :columns="illnessReleaseColumn"
            @confirm="getIllnessReleaseValue"
            @cancel="illnessRelease = false"
          />
        </van-popup>
        <van-field name="ifSatisfaction" label="服务满意与否:">
          <template #input>
            <van-radio-group v-model="ifSatisfaction" direction="horizontal">
              <van-radio name="1">满意</van-radio>
              <van-radio name="2">不满意</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div v-if="ifSatisfaction == '2'">
          <van-field
            v-model="satisfactionText"
            name="服务不满意描述"
            label="服务不满意描述:"
            placeholder="请填写不满意描述"
            :rules="[{ required: true, message: '请填写不满意描述' }]"
          />
        </div>
        <van-field name="ifExistOpinion" label="是否有意见:">
          <template #input>
            <van-radio-group v-model="ifExistOpinion" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div v-if="ifExistOpinion == '1'">
          <van-field
            v-model="existOpinionText"
            name="意见内容"
            label="意见内容描述:"
            placeholder="请填写意见内容"
            :rules="[{ required: true, message: '请填写意见内容' }]"
          />
        </div>
        <van-field
          v-model="clientFeedback"
          name="顾客反馈的其他内容"
          label="顾客反馈的其他内容:"
          placeholder="请填写顾客反馈的其他内容"
          :rules="[{ required: true, message: '请填写顾客反馈的其他内容' }]"
        />
        <van-field name="ifExistMonitor" label="是否有监测器械:">
          <template #input>
            <van-radio-group v-model="ifExistMonitor" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="ifLongTimeRely" label="是否长期服药:">
          <template #input>
            <van-radio-group v-model="ifLongTimeRely" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="ifUntowardEffect" label="有无药品不良反应:">
          <template #input>
            <van-radio-group v-model="ifUntowardEffect" direction="horizontal">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div v-if="ifUntowardEffect == '1'">
          <van-field
            v-model="untowardEffectText"
            name="具体不良反应"
            label="具体不良反应描述:"
            placeholder="请填写具体不良反应"
            :rules="[{ required: true, message: '请填写具体不良反应' }]"
          />
        </div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="communicateHobbyValue"
          label="沟通偏好:"
          placeholder="请选择"
          @click="communicateHobby = true"
        />
        <van-popup v-model="communicateHobby" position="bottom">
          <van-picker
            show-toolbar
            :columns="communicateHobbyColumn"
            @confirm="getCommunicateHobbyValue"
            @cancel="communicateHobby = false"
          />
        </van-popup>
        <van-cell
          title="最近复诊时间:"
          :value="againVisitDate"
          color="#b2b3b3"
          @click="onAgainShow = true"
        />
        <van-popup v-model="onAgainShow" position="bottom">
          <van-datetime-picker
            color="#169bd5"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onAgainVisitDate"
            @cancel="onAgainShow = false"
          />
        </van-popup>
        <van-field
          v-model="otherIllness"
          name="其他伴随疾病"
          label="其他伴随疾病:"
          :placeholder="
            yetAddIllnessList.length == 0 ? '请输入疾病关键词' : otherIllness
          "
          :rules="[{ required: true, message: '请填写其他伴随疾病' }]"
          @focus="openPopUp"
        />
        <div class="bloodData">
          <van-field
            v-model="highBloodPressure"
            name="高压"
            label="高压:"
            placeholder="请填写高压"
            maxlength="3"
            :rules="[{ required: true, message: '请填写高压' }]"
          />
          <van-field
            v-model="beforeEatFood"
            name="餐前血糖"
            label="餐前血糖:"
            placeholder="餐前血糖"
            maxlength="3"
            :rules="[{ required: true, message: '请填写餐前血糖' }]"
          />
          <van-field
            v-model="lowerBloodPressure"
            name="低压"
            label="低压:"
            placeholder="请填写低压"
            maxlength="3"
            :rules="[{ required: true, message: '请填写低压' }]"
          />
          <van-field
            v-model="laterEatFood"
            name="餐后血糖"
            label="餐后血糖:"
            placeholder="餐后血糖"
            maxlength="3"
            :rules="[{ required: true, message: '请填写餐后血糖' }]"
          />
        </div>
        <van-field
          v-model="returnVisitConclusion"
          name="回访小结"
          label="回访小结:"
          placeholder="回访小结"
          :rules="[{ required: true, message: '请填写回访小结' }]"
        />
        <div class="addMedicine" @click="getAddMedicineList">
          <span>+</span><span>添加药品</span>
        </div>
        <div class="medicineList">
          <div
            class="boxList"
            v-for="(item, index) in addMedicineList"
            :key="item.id"
          >
            <div class="list-head">
              <div class="head-left">
                <span>{{ index + 1 }}、</span><span>{{ item.goodsName }}</span>
              </div>
              <div class="head-right" @click="toDeteleMedicineList(index)">
                <van-icon name="delete-o" />
              </div>
            </div>
            <div class="list-body">
              <div class="body-left">{{ item.spec }}</div>
              <div class="body-right">
                <input
                  type="text"
                  placeholder="1"
                  v-model="item.quantity"
                /><label>{{ item.unit }}</label>
              </div>
            </div>
            <div class="list-footer">
              <label>用法用量:</label>
              <input type="text" placeholder="一日三次" v-model="item.usage" />
            </div>
          </div>
        </div>
      </van-form>
    </div>
    <!-- 弹出层 -->
    <van-action-sheet v-model="popup">
      <div class="wrapper">
        <div class="popblock">
          <div class="poptop">
            <div class="top-head">
              <van-search
                v-model="popupValue"
                label="输入病史"
                placeholder="请输入搜索关键词"
                @input="onSearchIllness"
              >
              </van-search>
            </div>
            <div class="top-body">
              <div
                class="body-list"
                v-for="item in searchIllnessList"
                :key="item.id"
              >
                <p>{{ item.tag_name }}</p>
                <div @click="toAddyetAddIllnessList(item)">
                  <span>+</span>添加
                </div>
              </div>
            </div>
          </div>
          <div class="popbottom">
            <div class="bottom-top"><span>已添加病史</span></div>
            <div class="bottom-box" v-if="yetAddIllnessList.length == 0">
              尚未添加任何病史~
            </div>
            <div class="bottom-lists">
              <div
                class="bottom-list"
                v-for="(item, index) in yetAddIllnessList"
                :key="item.id"
              >
                <p>{{ item.tag_name }}</p>
                <div @click="toDeteleIllnessData(index)">
                  <span>&times;</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-btn">
            <div class="addfamily" @click="affirmAddIllness">确认</div>
            <div
              class="cancelfamily"
              @click="toCancelAddIllness"
              v-if="yetAddIllnessList.length == 0"
            >
              取消
            </div>
            <div class="cancelfamily" @click="toClearAddIllness" v-else>
              重置
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 添加药品弹框 -->
    <van-action-sheet v-model="showAddMedicine" title="添加药品">
      <div class="addMedicinecontent">
        <div class="add-header">
          <van-search
            v-model="addMedicineValue"
            show-action
            label="药品名称"
            placeholder="请输入搜索药品关键词"
            @input="onSearchMedicineList"
          >
            <!-- <template #action>
                  <div @click="">搜索</div>
                </template> -->
          </van-search>
        </div>
        <div class="add-body">
          <div
            class="add-body-list"
            v-for="item in getSearchMedicineList"
            :key="item.goodsNo"
          >
            <div class="list-name">
              {{ item.goodsName }}&nbsp;{{ item.spec }}
            </div>
            <div class="list-btn" @click="toAddMedicineList(item)">
              <span>+</span>添加
            </div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 底部按钮 -->
    <div class="footer">
      <div class="btn1" @click="toAddNewReturn(recodeId)">添加</div>
      <div class="btn2">取消</div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
import { Dialog, Toast } from "vant";
import {
  toSearchMedicineList,
  toSearchIllnessList,
  addNewReturn,
} from "../../api";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      recodeId: "", //保存跳转传递的档案ID
      returnContentValue: "", //回访内容的值
      returnContent: false, //控制回访的显示隐藏
      returnContentColumn: [
        "健康照顾方案大方",
        "健康照顾方案小方",
        "慢病回访",
        "活动回访",
        "器械售后回访",
        "近效期回访",
        "久未交易回访",
        "新办会员回访",
        "商品会员生命周期回访",
        "阿胶回访",
      ], //回访内容可选项
      connectTypeValue: "", //接通类型值
      connectType: false, //控制接通类型显示隐藏
      connectTypeColumn: [
        "接通",
        "拒接",
        "接通后挂断",
        "停机",
        "关机",
        "无法接通",
        "无人接听",
        "空号",
        "号码有误",
      ], //可选列表
      medicineDrugUsing: "", //药物使用禁忌
      illnessRelease: false, //控制症状缓解显示隐藏
      illnessReleaseValue: "", //保存缓解症状的值
      illnessReleaseColumn: ["缓解", "无明显变化", "加重"], //显示隐藏的可选项
      ifSatisfaction: "", //是否满意 1 满意 2 不满意
      satisfactionText: "", //不满意时的意见
      ifExistOpinion: "", //是否有意见 1 是 2 否
      existOpinionText: "", //所提的意见
      clientFeedback: "", //顾客反馈其他内容
      ifExistMonitor: "", //是否有监测器械 1是 2否
      ifLongTimeRely: "", //是否长期服药 1是 2否
      ifUntowardEffect: "", //是否有不良反应 1是 2否
      untowardEffectText: "", //具体不良反应描述
      communicateHobby: false, //控制沟通习惯
      communicateHobbyValue: "", //保存控制沟通值
      communicateHobbyColumn: ["电话", "微信"], //沟通列表
      recentlyVistTime: "", //回访的时间
      againVisitDate: "",
      minDate: new Date(2020, 0, 1), //最早时间
      maxDate: new Date(2025, 10, 1), //最晚时间
      onAgainShow: false, //控制回访时间弹框
      //
      popup: false, //控制弹出层显示和隐藏
      popupValue: "", //保存疾病搜索框的值
      // 两个数组保存疾病弹框数据
      searchIllnessList: [], //搜索得到的疾病数据
      otherIllness: "", //保存其他疾病字符串
      yetAddIllnessList: [], //添加的疾病数据
      highBloodPressure: "", //高压值
      lowerBloodPressure: "", //低压值
      beforeEatFood: "", //餐前血糖
      laterEatFood: "", //餐后血糖
      returnVisitConclusion: "", //回访小结
      addMedicineList: [], //添加药品的列表
      getSearchMedicineList: [], //保存搜索药品得到的药品列表
      showAddMedicine: false, //控制添加药品的弹窗
      addMedicineValue: "", //输入添加药品搜索框中的值
      // 要提交的表单值
      content: "", //回访内容
      through_type: "", //接通类型
      taboo: "", //用药禁忌
      situation: "", //病情缓解情况
      is_meet: "", //服务满意与否
      meet_describe: "", //不满意描述
      is_opinion: "", //是否有意见
      meet_describe: "", //意见描述
      other_content: "", //客户反馈其他内容
      is_detection: "", //是否有监测器械
      is_medicine: "", //是否长期服药
      has_adversereactions: "", //有无药品不良反应
      visitway: "", //沟通偏好
      visit_date: "", //最近复诊时间
      other_disease: "", //其他伴随疾病
      before_bloodsugar: "", //餐前血糖
      after_bloodsugar: "", //餐后血糖
      bloodpressure_h: "", //高压
      bloodpressure_l: "", //低压
      summary: "", //回访小结
      goodsInfo: [], //药品集合
    };
  },
  created() {
    this.recodeId = this.$route.query.recodeId; //接收档案ID
  },
  methods: {
    // 新增回访
    toAddNewReturn(recodeId) {
      // 必填项接通类型拦截
      if (this.through_type === "") {
        Toast.fail({ message: "请选择接通类型", duration: 1000 });
        return;
      }
      // 必填项回访内容拦截
      if (this.content === "") {
        Toast.fail({ message: "请选择回访内容", duration: 1000 });
        return;
      }
      this.toAddGoodsInfo();
      Dialog.confirm({
        title: "添加回访",
        message: "是否确认添加？",
      })
        .then(() => {
          this.popupLoadingShow = true;
          var timestamp = new Date().getTime();
          var sign = this.getSign(timestamp);
          var query = {
            method: "saveUserFamilyVisitDataService",
            timestamp,
            sign,
            record_id: recodeId,
            create_user: "企微", //操作人
            content: this.content, //回访内容
            through_type: this.through_type, //接通类型
            taboo: this.medicineDrugUsing, //用药禁忌
            situation: this.situation, //缓解情况
            is_meet: this.ifSatisfaction, //服务满意与否
            meet_describe: this.satisfactionText, //不满意描述
            is_opinion: this.ifExistOpinion, //是否有意见
            meet_describe: this.existOpinionText, //意见描述
            other_content: this.clientFeedback, //客户反馈其他内容
            is_detection: this.ifExistMonitor, //是否有监测器械
            is_medicine: this.ifLongTimeRely, //是否长期服药
            has_adversereactions: this.ifUntowardEffect, //有无药品不良反应
            visitway: this.visitway, //沟通偏好
            visit_date: this.againVisitDate, //最近复诊时间
            other_disease: this.otherIllness, //其他伴随疾病
            before_bloodsugar: this.beforeEatFood, //餐前血糖
            after_bloodsugar: this.laterEatFood, //餐后血糖
            bloodpressure_h: this.highBloodPressure, //高压
            bloodpressure_l: this.lowerBloodPressure, //低压
            summary: this.returnVisitConclusion, //回访小结
            goodsInfo: this.goodsInfo, //药品集合
          };
          console.log(query, "query");
          addNewReturn(query)
            .then((res) => {
              console.log(res);
              if (res.message === "执行成功!") {
                this.popupLoadingShow = false;
                this.$toast({
                  type: "success",
                  message: "新增成功!",
                  duration: 500,
                });
                this.$router.push("/FamilyArchives");
              } else {
                this.$toast({
                  type: "fail",
                  message: res.message,
                  duration: 350,
                });
              }
            })
            .catch((err) => {
              Dialog.alert({
                title: "错误提醒",
                message: "网络延迟，请重试！",
              });
            });
        })
        .catch(() => {
          // Toast.success({message:'已取消',duration:350});
        });
    },
    //   回访内容
    getReturnContentValue(value) {
      if (value === "健康照顾方案大方") {
        this.content = "1";
      } else if (value === "健康照顾方案小方") {
        this.content = "2";
      } else if (value === "慢病回访") {
        this.content = "3";
      } else if (value === "活动回访") {
        this.content = "4";
      } else if (value === "器械售后回访") {
        this.content = "5";
      } else if (value === "近效期回访") {
        this.content = "6";
      } else if (value === "久未交易回访") {
        this.content = "7";
      } else if (value === "新办会员回访") {
        this.content = "8";
      } else if (value === "商品会员生命周期回访") {
        this.content = "9";
      } else if (value === "阿胶回访") {
        this.content = "10";
      }
      this.returnContentValue = value;
      this.returnContent = false;
    },
    // 接通类型
    getConnectTypeValue(value) {
      if (value === "接通") {
        this.through_type = "1";
      } else if (value === "拒接") {
        this.through_type = "2";
      } else if (value === "接通后挂断") {
        this.through_type = "3";
      } else if (value === "停机") {
        this.through_type = "4";
      } else if (value === "关机") {
        this.through_type = "5";
      } else if (value === "无法接通") {
        this.through_type = "6";
      } else if (value === "无人接听") {
        this.through_type = "7";
      } else if (value === "空号") {
        this.through_type = "8";
      } else if (value === "号码有误") {
        this.through_type = "9";
      }
      this.connectTypeValue = value;
      this.connectType = false;
    },
    // 是否缓解
    getIllnessReleaseValue(value) {
      if (value === "缓解") {
        this.situation = "1";
      } else if (value === "无明显变化") {
        this.situation = "2";
      } else if (value === "加重") {
        this.situation = "3";
      }
      this.illnessReleaseValue = value;
      this.illnessRelease = false;
    },
    // 沟通习惯
    getCommunicateHobbyValue(value) {
      if (value === "电话") {
        this.visitway = "1";
      } else if (value === "微信") {
        this.visitway = "2";
      }
      this.communicateHobbyValue = value;
      this.communicateHobby = false;
    },
    // 选择复诊日期
    formatDate(againVisitDate) {
      return `${againVisitDate.getFullYear()}/${
        againVisitDate.getMonth() + 1
      }/${againVisitDate.getDate()}`;
    },
    onAgainVisitDate(againVisitDate) {
      this.onAgainShow = false;
      this.againVisitDate = this.formatDate(againVisitDate);
    },
    // 打开弹出框
    openPopUp() {
      this.popup = true;
    },
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 弹框搜索疾病
    onSearchIllness() {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getMemberSearchDiseaseTypeService",
        searchKey: this.popupValue,
        sign: sign,
        timestamp: timestamp,
      };
      toSearchIllnessList(query).then((res) => {
        console.log(res.searchDiseaseTypeList, "xxxxxxxxxxxxx");
        this.searchIllnessList = res.searchDiseaseTypeList;
      });
    },
    // 弹框取消添加疾病
    toCancelAddIllness() {
      this.popup = false;
    },
    // 点击疾病添加到已添加列表
    toAddyetAddIllnessList(item) {
      console.log(this.yetAddIllnessList);
      if (this.yetAddIllnessList.length == 0) {
        this.yetAddIllnessList.push(item);
        return;
      }
      for (var i = 0; i < this.yetAddIllnessList.length; i++) {
        if (this.yetAddIllnessList.indexOf(item) == -1) {
          this.yetAddIllnessList.push(item);
          break;
        } else {
          this.$toast({ type: "fail", message: "已添加！", duration: 350 });
          break;
        }
      }
      console.log(this.yetAddIllnessList);
    },
    // 清空添加疾病列表
    toClearAddIllness() {
      this.yetAddIllnessList = [];
    },
    // 点击删除某一条数据
    toDeteleIllnessData(num) {
      console.log(num);
      this.yetAddIllnessList.splice(num, 1);
    },
    // 确认添加
    affirmAddIllness() {
      this.otherIllness = ""; //重置
      this.yetAddIllnessList.forEach((item) => {
        this.otherIllness = this.otherIllness + item.tag_name + ",";
      });
      if (this.yetAddIllnessList.length == 0) {
        this.$toast({ type: "fail", message: "还未添加病史", duration: 350 });
        return;
      }
      this.otherIllness = this.otherIllness.slice(0, -1);
      this.popup = false;
      console.log(this.otherIllness, "xxxxxxxxxxxxxx");
      // this.yetAddIllnessList = [];
    },
    // 通过弹框添加药品
    getAddMedicineList() {
      this.showAddMedicine = true;
    },
    // 添加药品点击添加按钮进行药品添加
    toAddMedicineList(item) {
      console.log(item, "药品名称");
      var obj = item;
      obj.quantity = "";
      obj.usage = "";
      // 将
      this.showAddMedicine = false;
      if (this.addMedicineList.length == 0) {
        this.addMedicineList.push(obj);
        return;
      }
      for (var i = 0; i < this.addMedicineList.length; i++) {
        if (this.addMedicineList.indexOf(obj) == -1) {
          this.addMedicineList.push(obj);
          break;
        } else {
          this.$toast({ type: "fail", message: "已添加！", duration: 350 });
          break;
        }
      }
      console.log(this.addMedicineList, "addMedicineList");
    },
    // 处理要添加的药品对象
    toAddGoodsInfo() {
      if (this.addMedicineList.length > 0) {
        this.addMedicineList.forEach((item) => {
          var obj = {};
          obj.goodsNo = item.goodsNo;
          obj.quantity = item.quantity;
          obj.usage = item.usage;
          this.goodsInfo.push(obj);
        });
      } else {
        this.goodsInfo = [];
      }
    },
    // 点击图标删除已添加的药品
    toDeteleMedicineList(num) {
      // this.addMedicineList.splice(num, 1);
      this.$dialog
        .confirm({
          title: "删除",
          message: "确认删除此药品?",
        })
        .then(() => {
          // on confirm
          this.$toast({ type: "success", message: "已删除", duration: 350 });
          this.addMedicineList.splice(num, 1);
        })
        .catch(() => {
          // on cancel
        });
    },
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 弹框搜索疾病
    onSearchMedicineList() {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getMemberSearchGoodsService",
        searchKey: this.addMedicineValue,
        sign: sign,
        timestamp: timestamp,
      };
      toSearchMedicineList(query).then((res) => {
        console.log(res, "xxxxxxxxxxxxx");
        this.getSearchMedicineList = res.searchGoodsList;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* 灰条样式 */
.gray_line {
  width: 100%;
  height: 1px;
  background-color: #80808065;
}
.content {
  box-sizing: border-box;
  position: fixed;
  padding: 50px 0;
  width: 100%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999;
  left: 0;
  top: 0;
  /deep/ .van-action-sheet__content {
    font-size: 12px;
  }
  /deep/ .van-cell {
    font-size: 12px;
  }
  /deep/ .van-cell__title {
    width: 38% !important;
  }
  /deep/ .van-cell__value {
    text-align: left;
  }
}
.bloodData {
  width: 100%;
  background-color: #808080;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  /deep/ .van-cell {
    width: 50%;
  }
  /deep/ .van-cell__title {
    width: 39% !important;
  }
}
// 添加药品
.addMedicine {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #808080;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 5px auto;
  font-size: 12px;
}
.medicineList {
  background-color: #f8f8f8;
  width: 100%;
  input {
    border: 1px solid #808080;
    padding-left: 3px;
  }
  .boxList {
    width: 90%;
    height: 100px;
    margin: 0 auto;
    border-top: 1px dashed #666;
    box-sizing: border-box;

    .list-head,
    .list-body {
      font-size: 12px;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-head {
      .head-right {
        font-size: 13px;
      }
    }
    .list-body {
      input {
        width: 50%;
      }
    }
    .list-footer {
      height: 30px;
      font-size: 12px;
    }
  }
  .boxList:first-child {
    border-top: none;
  }
}
// 添加药品弹框
.addMedicinecontent {
  font-size: 12px;
  .add-body {
    width: 100%;
    height: 280px;
    overflow-y: auto;
    .add-body-list {
      width: 90%;
      height: 30px;
      background-color: #f8f8f8;
      margin: 3px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list-name {
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .list-btn {
        background-color: #409eff;
        color: #fff;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        width: 40px;
        height: 100%;
      }
    }
  }
}
// 弹出层样式
.wrapper {
  height: 534px;
  overflow: hidden;
  .popblock {
    height: 100%;
    overflow: hidden;
    position: relative;
    .poptop {
      width: 100%;
      height: 45%;
      margin-top: 10%;
      .top-body {
        width: 100%;
        height: 70%;
        overflow-y: auto;
        .body-list {
          width: 90%;
          height: 30px;
          margin: 3px auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #eeeeee83;
          border-radius: 3px;
          p {
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            background-color: #3399ff;
            color: #fff;
            height: 20px;
            width: 40px;
            font-size: 10px;
            text-align: center;
            line-height: 20px;
          }
        }
      }
    }
    .popbottom {
      width: 100%;
      .bottom-top {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #b3b3b36e;
        box-sizing: border-box;
        span {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .bottom-box {
        width: 100%;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: #808080;
      }
      .bottom-lists {
        width: 100%;
        height: 180px;
        overflow-y: auto;
        .bottom-list {
          width: 90%;
          height: 30px;
          margin: 3px auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background-color: #eeeeee83;
          border-radius: 3px;
          p {
            width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            width: 12px;
            height: 12px;
            line-height: 12px;
            text-align: center;
            border-radius: 50%;
            color: #808080;
            border: 1px solid #808080;
          }
        }
      }
    }
    .bottom-btn {
      width: 90%;
      height: 5%;
      position: absolute;
      top: 10px !important;
      left: 50%;
      margin-left: -45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      overflow: hidden;
    }
  }
}
// 底部按钮
.footer {
  position: absolute;
  bottom: 0;
  z-index: 998;
  font-size: 14px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  div {
    width: 40%;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
  }
  .btn1 {
    color: #fff;
    background-color: #169bd5;
  }
  .btn2 {
    border: 1px solid #797979;
    box-sizing: border-box;
    line-height: 39px;
  }
}
</style>