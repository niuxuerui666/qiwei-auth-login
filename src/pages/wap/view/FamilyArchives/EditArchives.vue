<template>
  <div>
    <!-- 档案 -->
    <child>
      <span class="l-span2">编辑档案</span>
    </child>
    <!-- 灰条 -->
    <div class="gray_line"></div>
    <div class="content">
      <div class="content-scroll">
      <!-- tab切换 -->
      <!-- <div class="tabs">
        <div
          @click="changeTab(0)"
          class="tabbox tab-son1"
          :class="index == 0 ? 'active' : ''"
        >
          身份信息
        </div>
        <div
          @click="changeTab(1)"
          class="tabbox tab-son2"
          :class="index == 1 ? 'active' : ''"
        >
          医疗信息
        </div>
        <div
          @click="changeTab(2)"
          class="tabbox tab-son3"
          :class="index == 2 ? 'active' : ''"
        >
          生活习惯
        </div>
      </div> -->
      <!-- tab内容区 -->
      <div class="texts">
        <div class="txt1">
          <div class="labels">
            <div class="label">
              <span class="l-span1"></span>
              <span class="l-spans2">处方记录</span>
            </div>
          </div>
          <van-field
            readonly
            clickable
            required
            name="picker"
            :value="memberRelationValue"
            label="与会员关系:"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="memberRelation"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            required
            v-model="real_name"
            name="真实姓名"
            label="真实姓名:"
            placeholder="请填写真实姓名"
            :disabled="ifExistCard"
          />
          <div>
            <van-field
              v-model="identity_card"
              name="身份证号"
              label="身份证号:"
              maxlength="18"
              placeholder="请填写身份证号"
              :disabled="ifExistCard"
            />
          </div>
          <!-- <div v-else>
            <van-field
              readonly
              clickable
              name="身份证号"
              label="身份证号:"
              placeholder="请填写身份证号"
              :value="identity_card"
              @touchstart.native.stop="idcartShow = true"
            />
            <van-number-keyboard
              v-model="identity_card"
              :show="idcartShow"
              :maxlength="18"
              @blur="identityCodeValid(identity_card)"
              extra-key="X"
              close-button-text="完成"
            />
          </div> -->
          <van-field
            v-model="mobile"
            name="手机号"
            label="手机号:"
            maxlength="11"
            placeholder="请填写手机号"
            @blur="mobileValid"
          />
          <van-field
            v-model="tel"
            name="座机"
            label="座机:"
            placeholder="请填写座机"
            @blur="phoneValid"
          />
          <van-field name="sex" label="性别:">
            <template #input>
              <van-radio-group v-model="sex" direction="horizontal">
                <van-radio name="1">男</van-radio>
                <van-radio name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <!-- <van-field name="birthday" label="生日:">
              <template #input>
                <van-calendar v-model="show" :min-date="minDate" :max-date="maxDate" />
              </template>
            </van-field> -->
          <van-cell
            title="生日:"
            :value="birthday"
            @click="birthdayShow = true"
          />
          <van-popup v-model="birthdayShow" position="bottom">
            <van-datetime-picker
              v-model="defaultDate"
              color="#169bd5"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirmBirthday"
              @cancel="birthdayShow = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="picker"
            :value="memberMaritalStatusValue"
            label="婚姻状态:"
            placeholder="请选择"
            @click="showPickers = true"
          />
          <van-popup v-model="showPickers" position="bottom">
            <van-picker
              show-toolbar
              :columns="memberMaritalStatus"
              @confirm="togetMaritalValue"
              @cancel="showPickers = false"
            />
          </van-popup>
          <!-- <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >提交</van-button
              >
            </div> -->
        </div>
        <div class="txt2">
          <div class="labels">
            <div class="label">
              <span class="l-span1"></span>
              <span class="l-spans2">医疗信息</span>
            </div>
          </div>
          <van-field
            readonly
            clickable
            name="picker"
            :value="liverFunctionValue"
            label="肝功能:"
            placeholder="请选择"
            @click="liverFunction = true"
          />
          <van-popup v-model="liverFunction" position="bottom">
            <van-picker
              show-toolbar
              :columns="liverFunctionColumn"
              @confirm="getLiverFunctionValue"
              @cancel="liverFunction = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="picker"
            :value="kidneyFunctionValue"
            label="肾功能:"
            placeholder="请选择"
            @click="kidneyFunction = true"
          />
          <van-popup v-model="kidneyFunction" position="bottom">
            <van-picker
              show-toolbar
              :columns="kidneyFunctionColumn"
              @confirm="getKidneyFunctionValue"
              @cancel="kidneyFunction = false"
            />
          </van-popup>
          <van-field name="drugAllergyColumn" label="药物过敏史:">
            <template #input>
              <van-checkbox-group
                v-model="drugAllergyColumn"
                direction="horizontal"
                @change="drugAllergyColumnChange"
              >
                <div class="inner-radio">
                  <van-radio-group v-model="radioValue">
                    <van-radio v-on:click.stop="toChangeChoice" name="1"
                      >无</van-radio
                    >
                  </van-radio-group>
                </div>
                <van-checkbox name="青霉素">青霉素</van-checkbox>
                <van-checkbox name="磺胺类">磺胺类</van-checkbox>
                <van-checkbox name="头孢类">头孢类</van-checkbox>
                <van-checkbox name="链霉素">链霉素</van-checkbox>
                <van-checkbox name="解热镇痛类">解热镇痛类</van-checkbox>
                <van-checkbox name="其他">其他</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            label="既往病史:"
            :placeholder="
              lastMedicalHistory === '' || null
                ? '请填写既往病史'
                : lastMedicalHistory
            "
            @click="openPopUp('last')"
            readonly
          />
          <van-field
            label="家族病史"
            :placeholder="
              familyMedicalHistory === '' || null
                ? '请填写家族病史'
                : familyMedicalHistory
            "
            @click="openPopUp('family')"
            readonly
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="menstruationHistoryValue"
            label="月经史:"
            placeholder="请选择"
            @click="menstruationHistory = true"
            v-if="sex === '2'"
          />
          <van-popup v-model="menstruationHistory" position="bottom">
            <van-picker
              show-toolbar
              :columns="menstruationHistoryColumn"
              @confirm="getMenstruationHistoryValue"
              @cancel="menstruationHistory = false"
            />
          </van-popup>
          <!-- <van-field
            readonly
            clickable
            name="picker"
            :value="pregnancyValue"
            label="孕产史:"
            placeholder="请选择"
            @click="pregnancy = true"
            v-if="sex === '2'"
          />
          <van-popup v-model="pregnancy" position="bottom">
            <van-picker
              show-toolbar
              :columns="pregnancyColumn"
              @confirm="getpregnancyValue"
              @cancel="pregnancy = false"
            />
          </van-popup> -->
        </div>
        <div class="txt3">
          <div class="labels">
            <div class="label">
              <span class="l-span1"></span>
              <span class="l-spans2">生活习惯</span>
            </div>
          </div>
          <van-field name="dietaryHabitColumn" label="饮食习惯">
            <template #input>
              <van-checkbox-group
                v-model="dietaryHabitColumn"
                direction="horizontal"
                @change="eatHabitChange"
              >
                <van-checkbox name="均衡">均衡</van-checkbox>
                <van-checkbox name="偏淡">偏淡</van-checkbox>
                <van-checkbox name="偏油">偏油</van-checkbox>
                <van-checkbox name="偏辣">偏辣</van-checkbox>
                <van-checkbox name="偏甜">偏甜</van-checkbox>
                <van-checkbox name="偏咸">偏咸</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="smokingValue"
            label="吸烟情况:"
            placeholder="请选择"
            @click="smoking = true"
          />
          <van-popup v-model="smoking" position="bottom">
            <van-picker
              show-toolbar
              :columns="smokingColumn"
              @confirm="getSmokingValue"
              @cancel="smoking = false"
            />
          </van-popup>
          <van-field
            v-if="changeSmkingValue"
            v-model="smoke_years"
            name="烟龄"
            label="烟龄:"
            placeholder="请填写烟龄"
          />
          <van-field
            v-if="changeSmkingValue"
            v-model="smoke_quit_years"
            name="戒烟龄"
            label="戒烟龄:"
            placeholder="请填写戒烟龄"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="drinkingValue"
            label="饮酒情况:"
            placeholder="请选择"
            @click="drinking = true"
          />
          <van-popup v-model="drinking" position="bottom">
            <van-picker
              show-toolbar
              :columns="drinkingColumn"
              @confirm="getDrinkingValue"
              @cancel="drinking = false"
            />
          </van-popup>
          <van-field
            v-if="changeDrinkValue"
            v-model="drink_years"
            name="酒龄"
            label="酒龄:"
            placeholder="请填写酒龄"
          />
          <van-field
            v-if="changeDrinkValue"
            v-model="drink_quit_years"
            name="戒酒龄"
            label="戒酒龄:"
            placeholder="请填写戒酒龄"
          />
        </div>
      </div>
    </div>
  </div>
    <van-action-sheet v-model="popup" :close-on-click-overlay="false">
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
                :key="item.icdNo"
              >
                <p>{{ item.icdName }}{{ item.icdNo }}</p>
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
                :key="item.icdName"
              >
                <p>
                  <span>{{ item.icdName }}{{ item.icdNo }}</span>
                </p>
                <div @click="toDeteleIllnessData(index)">
                  <span>&times;</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-btn">
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
            <div class="addfamily" @click="affirmAddIllness">确认</div>
          </div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 弹窗加载 -->
    <div class="popupLoading" v-if="popupLoadingShow">
      <van-loading type="spinner" size="24px">加载中...</van-loading>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div class="btn1" @click="toAddNewArchives">确认</div>
      <div class="btn2" @click="toCancelEdit">取消</div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
import { toSearchIllnessList, addNewArchives } from "../../api";
import { Dialog, Toast } from "vant";
export default {
  components: {
    child: Child,
  },
  data() {
    return {
      idcartShow: false, //身份证号弹出数字键盘
      userID: "", //保存当前用户的userID
      memberId: "", //会员ID
      ifExistCard: false, //身份证 可操作
      index: 0, //控制标签展示
      userInfo: null, //保存要展示用户信息
      popupLoadingShow: false, //控制loading显示和隐藏
      // 用户身份信息
      minDate: new Date(1920, 0, 1), //最早时间
      maxDate: new Date(2025, 11, 1), //最晚时间
      defaultDate: new Date(1980, 0, 1), //默认选择时间
      birthdayShow: false,
      memberRelationValue: "", //会员的关系值
      memberMaritalStatusValue: "", //婚姻状态值
      memberRelation: ["本人", "父母", "夫妻", "子女", "亲属", "朋友", "其他"], //与会员的关系
      memberMaritalStatus: ["未婚", "已婚", "保密"], //婚姻状态
      showPicker: false,
      showPickers: false,
      // 用户医疗信息
      liverFunctionValue: "", //肝功能值
      liverFunctionColumn: ["异常", "正常"], //肝功能可选列表
      kidneyFunctionValue: "", //肾功能值
      kidneyFunctionColumn: ["异常", "正常"], //肾功能可选列表
      drugAllergyValue: "",
      drugAllergyColumn: [], //肾功能可选列表
      liverFunction: false,
      kidneyFunction: false,
      drugAllergy: false,
      lastMedicalHistory: "", //既往病史
      familyMedicalHistory: "", //家族病史
      lastMedicalList: [], //既往病史列表
      familyMedicalList: [], //家族病史列表
      lastDealSickList: [], //处理后既往病史
      familyDealSickList: [], //处理后家族病史
      medicalHistoryType: "", //弹框区分病史类型 now:现有；last：既往；family：家族
      menstruationHistory: false, //月经史
      menstruationHistoryColumn: ["正常", "经量异常", "周期不规律"], //月经史可选列表
      menstruationHistoryValue: "", //月经史值
      // pregnancy: false, //孕产史
      // pregnancyColumn: ["无", "有"], //孕产史列表
      // pregnancyValue: "", //孕产史值
      // 用户生活习惯信息
      dietaryHabit: false, //饮食习惯
      // dietaryHabitColumn: ["均衡", "偏淡", "偏油", "偏辣", "偏甜", "偏咸"], //饮食可选
      dietaryHabitColumn: [], //饮食可选
      dietaryHabitValue: "", //饮食的值
      smoking: false, //吸烟情况
      changeSmkingValue: false, //从不吸烟
      changeDrinkValue: false, //改变喝酒值
      smokingColumn: [
        "从不吸烟",
        "已戒烟",
        "偶尔吸烟",
        "经常吸烟",
        "二手烟困扰",
      ], //吸烟可选列表
      smokingValue: "", //吸烟值
      drinking: false, //喝酒情况
      drinkingColumn: ["从不喝酒", "偶尔喝酒", "经常喝酒", "酗酒"], //喝酒可选列表
      drinkingValue: "", //喝酒值
      popup: false, //控制弹出层显示和隐藏
      popupValue: "", //保存搜索框的值
      radioValue: "1", //控制多选框的互斥
      // 两个数组保存疾病弹框数据
      searchIllnessList: [], //搜索得到的疾病数据
      yetAddIllnessList: [], //添加的疾病数据
      // 要提交的表单数据
      relation: "", //与会员关系
      real_name: "", //用户真实姓名
      identity_card: "", //提交的身份证号
      mobile: "", //手机号
      tel: "", //座机
      sex: "1", //用户性别   1为男  2为女
      birthday: "", //用户生日
      birthdays: "", //用户生日
      is_marry: "", //婚姻状态
      liver_function: "", //肝功能
      renal_function: "", //肾功能
      allergy: "0", //药物过敏史
      previous_history: "", //既往病史
      family_history: "", //家庭病史
      menses_history: "", //月经史
      // pregnancy_history: "", //孕产史
      eat_habit: "", //饮食习惯
      smoke_state: "", //吸烟状态
      smoke_years: "", //烟龄
      smoke_quit_years: "", //戒烟龄
      drink_state: "", //喝酒状态
      drink_years: "", //酒龄
      drink_quit_years: "", //戒酒龄
    };
  },
  created() {
    this.memberId = this.$route.query.memberId;
    this.userInfo = this.$route.query.userData;
    this.echoData();
    this.ifExistCardId(this.userInfo);
  },
  methods: {
    // 校验身份证号
    identityCodeValid() {
      console.log(this.identity_card, "xxxx");
      // 重置生日
      this.birthday = "";
      if (this.identity_card == "") {
        return true;
      }
      //验证身份证格式
      var aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外",
      };
      var iSum = 0;
      var info = "";
      if (!/^\d{17}(\d|X|x)$/i.test(this.identity_card)) {
        Toast.fail({ message: "身份证号格式有误", duration: 750 });
        return false;
      }
      this.identity_card = this.identity_card.replace(/x$/i, "a");
      if (aCity[parseInt(this.identity_card.substr(0, 2))] == null) {
        Toast.fail({ message: "身份证号格式有误", duration: 750 });
        return false;
      }
      var sBirthday =
        this.identity_card.substr(6, 4) +
        "-" +
        Number(this.identity_card.substr(10, 2)) +
        "-" +
        Number(this.identity_card.substr(12, 2));
      var d = new Date(sBirthday.replace(/-/g, "/"));
      if (
        sBirthday !=
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      ) {
        Toast.fail({ message: "身份证号格式有误", duration: 750 });
        return false;
      }
      for (var i = 17; i >= 0; i--) {
        iSum +=
          (Math.pow(2, i) % 11) *
          parseInt(this.identity_card.charAt(17 - i), 11);
      }
      if (iSum % 11 != 1) {
        Toast.fail({ message: "身份证号格式有误", duration: 750 });
        return false;
      }
      // 自动生成生日
      this.getBirthdayFromIdCard(this.identity_card);
      return true;
    },
    // 根据身份证号获取生日
    getBirthdayFromIdCard(idCard) {
      var birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      }
      console.log(birthday, "birthday");
      this.birthday = birthday;
    },
    // 校验手机号
    mobileValid() {
      if (this.mobile === "") {
        return true;
      }
      var reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
      if (!reg.test(this.mobile)) {
        Toast.fail({ message: "手机号输入格式有误", duration: 750 });
        return false;
      }
      return true;
    },
    // 校验座机号
    phoneValid() {
      if (this.tel === "") {
        return true;
      }
      var reg = /^0\d{2,3}-?\d{7,8}$/;
      if (!reg.test(this.tel)) {
        Toast.fail({ message: "座机号输入格式有误", duration: 750 });
        return false;
      }
      return true;
    },
    // test() {},
    // 回显数据
    echoData() {
      // 要提交的表单数据
      // console.log(this.userInfo.relation);
      this.echoReation(this.userInfo.relation); //回显关系
      this.echoMarry(this.userInfo.is_marry); //回显结婚状态
      this.echoLiver(this.userInfo.liver_function); //回显肝功能
      this.echoRenal(this.userInfo.renal_function); //回显肾功能
      this.echoAllergy(this.userInfo.allergy); //回显药物过敏史
      this.echoMenses(this.userInfo.menses_history); //回显月经史
      // this.echoPregnancy(this.userInfo.pregnancy_history); //回显孕产史
      this.echoEatHabit(this.userInfo.eat_habit); //饮食习惯
      this.echoSmking(this.userInfo.smoke_state); //回显吸烟状态
      this.echoDrink(this.userInfo.drink_state); //回显喝酒状态
      this.real_name = this.userInfo.real_name; //用户真实姓名
      this.identity_card = this.userInfo.identity_card; //身份证号
      this.mobile = this.userInfo.mobile; //手机号
      this.tel = this.userInfo.tel; //座机
      (this.sex = this.userInfo.sex + ""), //用户性别   1为男  2为女
        (this.birthday =
          this.userInfo.birthday && this.userInfo.birthday.split(" ")[0]); //用户生日
      this.lastMedicalHistory = this.userInfo.previous_history; //既往病史previous_history_icdno
      this.familyMedicalHistory = this.userInfo.family_history; //家庭病史family_history_icdno
      //处理字符串
      this.dealLastSick(
        this.userInfo.previous_history,
        this.userInfo.previous_history_icdno
      );
      this.dealFamilySick(
        this.userInfo.family_history,
        this.userInfo.family_history_icdno
      );
      console.log(
        this.lastDealSickList,
        this.familyDealSickList,
        "xxxxx1111xxxx"
      );
      this.smoke_years = this.userInfo.smoke_years; //烟龄
      this.smoke_quit_years = this.userInfo.smoke_quit_years; //戒烟龄
      this.drink_years = this.userInfo.drink_years; //酒龄
      this.drink_quit_years = this.userInfo.drink_quit_years; //戒酒龄
    },
    // 确认编辑档案
    toAddNewArchives() {
      // 必填项拦截
      if (this.real_name === "") {
        Toast.fail({ message: "请填写真实姓名", duration: 1000 });
        return;
      }
      if (this.memberRelationValue === "") {
        Toast.fail({ message: "请选择与本人关系", duration: 1000 });
        return;
      }
      if (!this.ifExistCard) {
        if (!this.identityCodeValid()) {
          return false;
        }
      }
      if (!this.mobileValid()) {
        return false;
      }
      if (!this.phoneValid()) {
        return false;
      }
      Dialog.confirm({
        title: "修改档案",
        message: "是否确认修改？",
      })
        .then(() => {
          this.popupLoadingShow = true;
          var timestamp = new Date().getTime();
          var sign = this.getSign(timestamp);
          var query = {
            method: "saveUserHomeDataService",
            timestamp,
            sign,
            userId: this.memberId,
            recordId: this.userInfo.archives_id,
            saveNanme: "企微",
            relation: this.relation,
            mobile: this.mobile,
            tel: this.tel,
            sex: this.sex,
            birthday: this.birthdays,
            isMarry: this.is_marry,
            liverFunction: this.liver_function,
            renalFunction: this.renal_function,
            allergy: this.allergy,
            previousHistory: this.previous_history,
            familyHistory: this.family_history,
            // previousHistory: "I12.903,I95.101", //
            // familyHistory: "O10.900x001,H35.001", //
            mensesHistory: this.menses_history,
            pregnancyHistory: this.pregnancy_history,
            eatHabit: this.eat_habit,
            smokeState: this.smoke_state,
            smokeYears: this.smoke_years,
            smokeQuitYears: this.smoke_quit_years,
            drinkState: this.drink_state,
            drinkYears: this.drink_years,
            drinkQuitYears: this.drink_quit_years,
          };
          // 校验是否存在身份证号
          if (!this.ifExistCard) {
            query.name = this.real_name;
            query.idCard = this.identity_card;
          }
          console.log(query, "query！！！！");

          addNewArchives(query)
            .then((res) => {
              if (res.message === "执行成功!") {
                this.$toast({
                  type: "success",
                  message: "修改成功!",
                  duration: 500,
                });
                this.$router.go(-1);
              } else {
                this.$toast({
                  type: "fail",
                  message: res.message,
                  duration: 350,
                });
              }
              this.popupLoadingShow = false;
            })
            .catch((err) => {
              Dialog.alert({
                title: "错误提醒",
                message: "网络延迟，请重试！",
              });
              this.popupLoadingShow = false;
            });
        })
        .catch(() => {
          // Toast.success({message:'已取消',duration:350});
        });
    },
    // 回显操作
    // 处理既往史字符串
    dealLastSick(pName, pIcdno) {
      this.lastDealSickList = [];
      if (pName != null || undefined) {
        var str = "";
        if (pName.indexOf("|") != -1) {
          var pArr1 = pName.split("|");
          var pArr2 = pIcdno.split("|");
          pArr1.forEach((item, index) => {
            var obj = {};
            obj.icdName = item;
            obj.icdNo = pArr2[index];
            str = str + pArr2[index] + ",";
            this.lastDealSickList.push(obj);
          });
          this.previous_history = str.slice(0, -1);
        } else {
          var obj = {};
          obj.icdName = pName;
          obj.icdNo = pIcdno;
          str = pIcdno;
          this.lastDealSickList.push(obj);
          this.previous_history = str;
        }
      }
    },
    // 处理家族史字符串
    dealFamilySick(fName, fIcdno) {
      this.familyDealSickList = [];
      if (fName != null || undefined) {
        var str = "";
        if (fName.indexOf("|") != -1) {
          var fArr1 = fName.split("|");
          var fArr2 = fIcdno.split("|");
          fArr1.forEach((item, index) => {
            var obj = {};
            obj.icdName = item;
            obj.icdNo = fArr2[index];
            str = str + fArr2[index] + ",";
            this.familyDealSickList.push(obj);
          });
          this.family_history = str.slice(0, -1);
        } else {
          var obj = {};
          obj.icdName = fName;
          obj.icdNo = fIcdno;
          str = fIcdno;
          this.familyDealSickList.push(obj);
          this.family_history = str;
        }
      }
    },
    // 回显关系
    echoReation(value) {
      var str = null;
      if (value == "0") {
        str = "本人";
      } else if (value == "1") {
        str = "父母";
      } else if (value == "2") {
        str = "夫妻";
      } else if (value == "3") {
        str = "子女";
      } else if (value == "4") {
        str = "亲属";
      } else if (value == "5") {
        str = "朋友";
      } else if (value == "6") {
        str = "其他";
      }
      this.memberRelationValue = str;
    },
    // 回显婚姻状态
    echoMarry(value) {
      var str = null;
      if (value == "0") {
        str = "未婚";
      } else if (value == "1") {
        str = "已婚";
      } else if (value == "2") {
        str = "保密";
      }
      this.memberMaritalStatusValue = str;
    },
    // 回显肝功能
    echoLiver(value) {
      var str = null;
      if (value == "0") {
        str = "异常";
      } else if (value == "1") {
        str = "正常";
      }
      this.liverFunctionValue = str;
    },
    // 回显肾功能
    echoRenal(value) {
      var str = null;
      if (value == "0") {
        str = "异常";
      } else if (value == "1") {
        str = "正常";
      }
      this.kidneyFunctionValue = str;
    },
    // 回显药物过敏史
    echoAllergy(value) {
      if (value == "0" || value == null) {
        this.radioValue = "1";
      } else {
        this.radioValue = "2";
        if (value) {
          var arr = value.split(",") || value.split(" ");
          arr.forEach((item) => {
            if (item == "1") {
              this.drugAllergyColumn.push("青霉素");
            } else if (item == "2") {
              this.drugAllergyColumn.push("磺胺类");
            } else if (item == "3") {
              this.drugAllergyColumn.push("头孢类");
            } else if (item == "4") {
              this.drugAllergyColumn.push("链霉素");
            } else if (item == "5") {
              this.drugAllergyColumn.push("解热镇痛类");
            } else if (item == "20") {
              this.drugAllergyColumn.push("其他");
            }
          });
        }
      }
    },
    // 既往病史回显
    // 回显月经史
    echoMenses(value) {
      var str = null;
      if (value == "0") {
        str = "正常";
      } else if (value == "1") {
        str = "经量异常";
      } else if (value == "2") {
        str = "周期不规律";
      }
      this.menstruationHistoryValue = str;
    },
    // 回显孕产史
    echoPregnancy(value) {
      var str = null;
      if (value == "0") {
        str = "无";
      } else if (value == "1") {
        str = "有";
      }
      this.pregnancyValue = str;
    },
    // 回显饮食习惯
    echoEatHabit(value) {
      if (value) {
        var arr = value.split(",") || value.split(" ");
        arr.forEach((item) => {
          if (item == "0") {
            this.dietaryHabitColumn.push("均衡");
          } else if (item == "1") {
            this.dietaryHabitColumn.push("偏淡");
          } else if (item == "2") {
            this.dietaryHabitColumn.push("偏油");
          } else if (item == "3") {
            this.dietaryHabitColumn.push("偏辣");
          } else if (item == "4") {
            this.dietaryHabitColumn.push("偏甜");
          } else if (item == "5") {
            this.dietaryHabitColumn.push("偏咸");
          }
        });
      }
    },
    // 回显吸烟状态
    echoSmking(value) {
      var str = null;
      if (value == "1") {
        str = "从不吸烟";
        this.changeSmkingValue = false;
      } else if (value == "2") {
        str = "已戒烟";
        this.changeSmkingValue = true;
      } else if (value == "3") {
        str = "偶尔吸烟";
        this.changeSmkingValue = true;
      } else if (value == "4") {
        str = "经常吸烟";
        this.changeSmkingValue = true;
      } else if (value == "5") {
        str = "二手烟困扰";
        this.changeSmkingValue = false;
      }
      this.smokingValue = str;
    },
    // 回显喝酒状态
    echoDrink(value) {
      var str = null;
      if (value == "1") {
        str = "从不喝酒";
        this.changeDrinkValue = false;
      } else if (value == "2") {
        str = "偶尔喝酒";
        this.changeDrinkValue = true;
      } else if (value == "3") {
        str = "经常喝酒";
        this.changeDrinkValue = true;
      } else if (value == "4") {
        str = "酗酒";
        this.changeDrinkValue = true;
      }
      this.drinkingValue = str;
    },
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 判断身份证信息
    ifExistCardId(obj) {
      if (obj.identity_card == null) {
        this.ifExistCard = false;
      } else {
        this.ifExistCard = true;
      }
    },
    changeTab(idx) {
      this.index = idx; //通过改变index改变tab页
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    // 与本人关系
    onConfirm(value) {
      var str = null;
      if (value == "本人") {
        str = "0";
      } else if (value == "父母") {
        str = "1";
      } else if (value == "夫妻") {
        str = "2";
      } else if (value == "子女") {
        str = "3";
      } else if (value == "亲属") {
        str = "4";
      } else if (value == "朋友") {
        str = "5";
      } else {
        str = "6";
      }
      this.memberRelationValue = value;
      this.relation = str;
      this.showPicker = false;
    },
    // 选择生日
    formatDate(birthday) {
      this.birthday = `${birthday.getFullYear()}-${birthday.getMonth() +
        1}-${birthday.getDate()}`;
      return (
        `${birthday.getFullYear()}-${birthday.getMonth() +
          1}-${birthday.getDate()}` + " 00:00:00"
      );
    },
    onConfirmBirthday(birthday) {
      this.birthdayShow = false;
      this.birthdays = this.formatDate(birthday);
    },
    // 婚姻状态
    togetMaritalValue(value) {
      var str = null;
      if (value == "未婚") {
        str = "0";
      } else if (value == "已婚") {
        str = "1";
      } else if (value == "保密") {
        str = "2";
      }
      this.is_marry = str;
      this.memberMaritalStatusValue = value;
      this.showPickers = false;
    },
    // 医疗信息
    // 肝
    getLiverFunctionValue(value) {
      var str = null;
      if (value == "异常") {
        str = "0";
      } else if (value == "正常") {
        str = "1";
      }
      this.liver_function = str;
      this.liverFunctionValue = value;
      this.liverFunction = false;
    },
    // 肾
    getKidneyFunctionValue(value) {
      var str = null;
      if (value == "异常") {
        str = "0";
      } else if (value == "正常") {
        str = "1";
      }
      this.renal_function = str;
      this.kidneyFunctionValue = value;
      this.kidneyFunction = false;
    },
    // 药物过敏多选框
    toChangeChoice() {
      if (this.radioValue === "1") {
        this.drugAllergyColumn = [];
        this.radioValue = "2";
      }
    },
    // 弹框搜索疾病
    onSearchIllness() {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "searchIcdDisease",
        keyword: this.popupValue,
        pageNo: 1,
        pageSize: 50,
        sign: sign,
        timestamp: timestamp,
      };
      toSearchIllnessList(query).then((res) => {
        console.log(res.searchDiseaseTypeList, "xxxxxxxxxxxxx");
        this.searchIllnessList = res.diseaseList;
      });
    },
    // 药物过敏
    drugAllergyColumnChange() {
      if (this.drugAllergyColumn.length == 0) {
        this.radioValue = "1";
        this.allergy = "0";
      } else {
        this.radioValue = "2";
        var str = "";
        var arr = this.drugAllergyColumn;
        if (arr.indexOf("青霉素") != -1) {
          str = str + "1,";
        }
        if (arr.indexOf("磺胺类") != -1) {
          str = str + "2,";
        }
        if (arr.indexOf("头孢类") != -1) {
          str = str + "3,";
        }
        if (arr.indexOf("链霉素") != -1) {
          str = str + "4,";
        }
        if (arr.indexOf("解热镇痛类") != -1) {
          str = str + "5,";
        }
        if (arr.indexOf("其他") != -1) {
          str = str + "20,";
        }
        this.allergy = str.slice(0, -1);
      }
    },
    // 月经
    getMenstruationHistoryValue(value) {
      var str = null;
      if (value == "正常") {
        str = "0";
      } else if (value == "经量异常") {
        str = "1";
      } else if (value == "周期不规律") {
        str = "2";
      }
      this.menses_history = str;
      this.menstruationHistoryValue = value;
      this.menstruationHistory = false;
    },
    // 孕产
    // getpregnancyValue(value) {
    //   var str = null;
    //   if (value == "无") {
    //     str = "0";
    //   } else if (value == "有") {
    //     str = "1";
    //   }
    //   this.pregnancy_history = str;
    //   this.pregnancyValue = value;
    //   this.pregnancy = false;
    // },
    // 生活习惯
    // 饮食习惯
    eatHabitChange() {
      var str = "";
      var arr = this.dietaryHabitColumn;
      if (arr.indexOf("均衡") != -1) {
        str = str + "0,";
      }
      if (arr.indexOf("偏淡") != -1) {
        str = str + "1,";
      }
      if (arr.indexOf("偏油") != -1) {
        str = str + "2,";
      }
      if (arr.indexOf("偏辣") != -1) {
        str = str + "3,";
      }
      if (arr.indexOf("偏甜") != -1) {
        str = str + "4,";
      }
      if (arr.indexOf("偏咸") != -1) {
        str = str + "5,";
      }
      this.eat_habit = str.slice(0, -1);
    },
    getSmokingValue(value) {
      var str = null;
      if (value == "从不吸烟") {
        str = "1";
        this.changeSmkingValue = false;
      } else if (value == "已戒烟") {
        str = "2";
        this.changeSmkingValue = true;
      } else if (value == "偶尔吸烟") {
        str = "3";
        this.changeSmkingValue = true;
      } else if (value == "经常吸烟") {
        str = "4";
        this.changeSmkingValue = true;
      } else if (value == "二手烟困扰") {
        str = "5";
        this.changeSmkingValue = false;
      }
      this.smoke_state = str;
      this.smokingValue = value;
      this.smoking = false;
    },
    // 酒
    getDrinkingValue(value) {
      var str = null;
      if (value == "从不喝酒") {
        str = "1";
        this.changeDrinkValue = false;
      } else if (value == "偶尔喝酒") {
        str = "2";
        this.changeDrinkValue = true;
      } else if (value == "经常喝酒") {
        str = "3";
        this.changeDrinkValue = true;
      } else if (value == "酗酒") {
        str = "4";
        this.changeDrinkValue = true;
      }
      this.drink_state = str;
      this.drinkingValue = value;
      this.drinking = false;
    },
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    // 打开弹出框
    openPopUp(val) {
      this.popupValue = "";
      this.searchIllnessList = [];
      if (val === "last") {
        if (this.lastDealSickList.length > 0) {
          this.lastDealSickList.forEach((item) => {
            this.lastMedicalList.push(item);
          });
          this.lastDealSickList = []; //执行完重置
        }
        if (this.lastMedicalList.length > 0) {
          this.lastMedicalList.forEach((item) => {
            this.yetAddIllnessList.push(item);
          });
          console.log(this.yetAddIllnessList, "yetAddIllnessList");
        } else {
          this.yetAddIllnessList = [];
        }
      } else {
        if (this.familyDealSickList.length > 0) {
          this.familyDealSickList.forEach((item) => {
            this.familyMedicalList.push(item);
          });
          this.familyDealSickList = []; //执行完重置
        }
        if (this.familyMedicalList.length > 0) {
          this.familyMedicalList.forEach((item) => {
            this.yetAddIllnessList.push(item);
          });
        } else {
          this.yetAddIllnessList = [];
        }
      }
      this.medicalHistoryType = val;
      this.popup = true;
      console.log(this.medicalHistoryType);
    },
    // 弹框取消添加疾病
    toCancelAddIllness() {
      this.popup = false;
    },
    // 点击疾病添加到已添加列表
    toAddyetAddIllnessList(item) {
      console.log(this.yetAddIllnessList, "添加");
      if (this.yetAddIllnessList.length == 0) {
        this.yetAddIllnessList.unshift(item);
        return;
      }
      var str = "";
      this.yetAddIllnessList.forEach((res) => {
        str = str + res.icdNo + ",";
      });
      console.log(str, "strstr");
      if (str.indexOf(item.icdNo) == -1) {
        this.yetAddIllnessList.unshift(item);
      } else {
        this.$toast({ type: "fail", message: "已添加！", duration: 350 });
      }
      // for (var i = 0; i < this.yetAddIllnessList.length; i++) {
      //   if (this.yetAddIllnessList[i].icdNo != item.icdNo) {
      //     this.yetAddIllnessList.unshift(item);
      //     break;
      //   } else {
      //     this.$toast({ type: "fail", message: "已添加！", duration: 350 });
      //     break;
      //   }
      // }
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
    // 添加疾病
    affirmAddIllness() {
      // 操作一波,获取病史的ID值
      if (this.medicalHistoryType == "last") {
        var str = "";
        if (this.yetAddIllnessList.length == 0) {
          this.lastMedicalList = [];
          this.lastMedicalHistory = "";
          this.previous_history = "";
        } else {
          this.lastMedicalHistory = ""; //重置
          this.lastMedicalList = [];
          this.yetAddIllnessList.forEach((item) => {
            this.lastMedicalList.push(item);
            this.lastMedicalHistory =
              this.lastMedicalHistory + item.icdName + ";";
            str = str + item.icdNo + ",";
          });
          this.previous_history = str.slice(0, -1);
        }
      } else {
        var str = "";
        if (this.yetAddIllnessList == 0) {
          this.familyMedicalList = [];
          this.familyMedicalHistory = "";
          this.family_history = "";
        } else {
          this.familyMedicalHistory = ""; //重置
          this.familyMedicalList = [];
          this.yetAddIllnessList.forEach((item) => {
            this.familyMedicalList.push(item);
            this.familyMedicalHistory =
              this.familyMedicalHistory + item.icdName + ";";
            str = str + item.icdNo + ",";
          });
          this.family_history = str.slice(0, -1);
        }
      }
      // if (this.yetAddIllnessList.length == 0) {
      //   this.$toast({ type: "fail", message: "还未添加病史", duration: 350 });
      //   return;
      // }
      this.popup = false;
      this.yetAddIllnessList = [];
    },
    // 点击跳转上一页
    toCancelEdit() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
// 超出滚动显示
.content {
  box-sizing: border-box;
  position: fixed;
  padding: 50px 0;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .content-scroll {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /deep/ .van-picker {
    z-index: 999 !important;
  }
  /deep/ .van-action-sheet__content {
    font-size: 12px;
  }
  /deep/ .van-cell {
    font-size: 12px;
  }
  /deep/ .van-checkbox__icon {
    font-size: 15px;
  }
  /deep/ .van-radio__icon {
    font-size: 15px;
  }
}
.inner-radio {
  margin-right: 5px;
   margin-top: 10px;
}
/deep/ .van-checkbox {
  margin-top: 10px;
}

/* 灰条样式 */
.gray_line {
  width: 100%;
  height: 1px;
  background-color: #80808065;
}
// 会员标签
.labels {
  line-height: 25px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
}
.label {
  .l-span1 {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #4a90e2;
  }
  .l-spans2 {
    font-size: 13px;
    margin-left: 6px;
  }
}
// 标签栏
.tabs {
  width: 325px;
  display: flex;
  margin: 20px auto;
  justify-content: space-between;
  .tabbox {
    width: 25%;
    font-size: 12px;
    border: 1px solid #000;
    border-radius: 5px;
    line-height: 28px;
    text-align: center;
  }
  .active {
    color: #3399ff;
    border-color: #3399ff;
  }
}
// 标签切换内容
.texts {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  min-height: 270px;
  font-size: 14px;
  tr {
    height: 30px;
    input {
      color: #808080;
    }
    span {
      font-size: 12px;
      display: none;
    }
  }
  tr:hover span {
    display: block;
  }
}

.wrapper {
  height: 534px;
  .popblock {
    height: 100%;
    overflow: hidden;
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
      background-color: #fff;
      width: 90%;
      height: 5%;
      position: absolute;
      z-index: 1000 !important;
      top: 10px !important;
      left: 50%;
      margin-left: -45%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      overflow: hidden;
      // div {
      //   width: 30%;
      //   height: 100%;
      //   border-radius: 5px;
      //   text-align: center;
      //   line-height: 30px;
      // }
      // .addfamily {
      //   background-color: #169bd5;
      // }
      // .cancelfamily {
      //   border: 1px solid #aaa;
      //   box-sizing: border-box;
      // }
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
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #dcdfe6;
  div {
    cursor: pointer;
    width: 25%;
    border-radius: 4px;
    line-height: 30px;
    height: 30px;
    text-align: center;
  }
  .btn1 {
    color: #fff;
    background-color: #169bd5;
  }
  .btn2 {
    border: 1px solid #797979;
    box-sizing: border-box;
  }
}
</style>
