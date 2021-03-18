<template>
  <div>
    <div v-if="user_type === '' || null">
      <loading></loading>
    </div>
    <div v-else>
      <!-- 企微用户 -->
      <div v-if="user_type === '2'" class="microimg">
        <img :src="microimgUrl" />
      </div>
      <!-- 微信用户 -->
      <div v-else>
        <!-- 客户不是会员 -->
        <div class="notNumber" v-if="memberid === '' || null">
          <div @click="toSendUpGrade"><img :src="upGradeUrl" /></div>
        </div>
        <!-- 客户是会员 -->
        <div v-else>
          <div v-if="userInfoList == null">
            111
            <loading></loading>
          </div>
          <!-- 无相关档案 -->
          <div v-else-if="userInfoList.length == 0" class="noarchive">
            <img :src="noarchive" />
            <p>没有找到档案</p>
            <div @click="toAddNewArchives">新建</div>
          </div>
          <!-- 有相关档案 -->
          <div v-else-if="userInfoList.length > 0">
            <!-- 家庭档案成员 -->
            <div class="header">
              <!-- 下拉选择成员 -->
              <div class="selectNumber">
                <span>选择成员:</span>
                <van-dropdown-menu active-color="#3399ff">
                  <van-dropdown-item
                    v-model="recordID"
                    :options="options"
                    @change="toChangeUser"
                  />
                </van-dropdown-menu>
              </div>
            </div>
            <div class="content">
              <!-- 档案 -->
              <div class="labels">
                <div class="label">
                  <span class="l-span1"></span>
                  <span class="l-span2">基本资料</span>
                </div>
                <div class="toEdit" @click="toEditArchives(userInfo)">
                  <span>编辑</span>
                </div>
              </div>
              <!-- tab切换 -->
              <div class="texts">
                <van-tabs v-model="activeTitle" color="#4a90e2">
                  <van-tab title="身份信息">
                    <div class="txt1">
                      <table>
                        <tr>
                          <td width="120px">与会员关系：</td>
                          <td>
                            <p v-if="userInfo.relation == 0">本人</p>
                            <p v-if="userInfo.relation == 1">父母</p>
                            <p v-if="userInfo.relation == 2">夫妻</p>
                            <p v-if="userInfo.relation == 3">子女</p>
                            <p v-if="userInfo.relation == 4">亲属</p>
                            <p v-if="userInfo.relation == 5">朋友</p>
                            <p v-if="userInfo.relation == 6">其他</p>
                            <p v-if="userInfo.relation == null || ''">-</p>
                          </td>
                          <td width="20px"></td>
                        </tr>
                        <tr>
                          <td>真实姓名：</td>
                          <td>
                            <p>{{ userInfo.real_name }}</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>身份证号：</td>
                          <td>
                            <p>
                              {{
                                userInfo.identity_card
                                  ? userInfo.identity_card
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>手机：</td>
                          <td>
                            <p>{{ userInfo.mobile ? userInfo.mobile : "-" }}</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>座机：</td>
                          <td>
                            <p>{{ userInfo.tel ? userInfo.tel : "-" }}</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>性别：</td>
                          <td>
                            <p v-if="userInfo.sex == 1">男</p>
                            <p v-if="userInfo.sex == 2">女</p>
                            <p v-if="userInfo.sex == 3">未知</p>
                            <p v-if="userInfo.sex == null || ''">-</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>生日：</td>
                          <td>
                            <p>
                              {{
                                userInfo.birthday &&
                                userInfo.birthday.split(" ")[0]
                                  ? userInfo.birthday.split(" ")[0]
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>婚姻状态：</td>
                          <td>
                            <p v-if="userInfo.is_marry == 0">未婚</p>
                            <p v-if="userInfo.is_marry == 1">已婚</p>
                            <p v-if="userInfo.is_marry == 2">保密</p>
                            <p v-if="userInfo.is_marry == null || ''">-</p>
                          </td>
                          <td></td>
                        </tr>
                      </table>
                    </div>
                  </van-tab>
                  <van-tab title="医疗信息">
                    <div class="txt2">
                      <table>
                        <tr>
                          <td width="120px">肝功能：</td>
                          <td>
                            <p v-if="userInfo.liver_function == 0">异常</p>
                            <p v-if="userInfo.liver_function == 1">正常</p>
                            <p v-if="userInfo.liver_function == null || ''">
                              -
                            </p>
                          </td>
                          <td width="20px"></td>
                        </tr>
                        <tr>
                          <td>肾功能：</td>
                          <td>
                            <p v-if="userInfo.renal_function == 0">异常</p>
                            <p v-if="userInfo.renal_function == 1">正常</p>
                            <p v-if="userInfo.renal_function == null || ''">
                              -
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>药物过敏史：</td>
                          <td>
                            <p>{{ allergyStr ? allergyStr : "-" }}</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>既往病史：</td>
                          <td>
                            <p>
                              {{
                                userInfo.previous_history
                                  ? userInfo.previous_history
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>家族病史：</td>
                          <td>
                            <p>
                              {{
                                userInfo.family_history
                                  ? userInfo.family_history
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr v-if="userInfo.sex == 2">
                          <td>月经史：</td>
                          <td>
                            <p v-if="userInfo.menses_history == 0">正常</p>
                            <p v-if="userInfo.menses_history == 1">经量异常</p>
                            <p v-if="userInfo.menses_history == 2">
                              周期不规律
                            </p>
                            <p v-if="userInfo.menses_history == null || ''">
                              -
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <!-- <tr>
                          <td>孕产史：</td>
                          <td>
                            <p v-if="userInfo.pregnancy_history == 0">无</p>
                            <p v-if="userInfo.pregnancy_history == 2">有</p>
                            <p v-if="userInfo.pregnancy_history == null || ''">
                              -
                            </p>
                          </td>
                          <td></td>
                        </tr> -->
                      </table>
                    </div>
                  </van-tab>
                  <van-tab title="生活习惯">
                    <div class="txt3">
                      <table>
                        <tr>
                          <td width="120px">饮食习惯：</td>
                          <td>
                            <p>{{ eatHabitValue ? eatHabitValue : "-" }}</p>
                          </td>
                          <td width="20px"></td>
                        </tr>
                        <!-- <tr>
                          <td>体育锻炼：</td>
                          <td>
                            <p v-if="userInfo.sports_frequency == 0">
                              几乎不运动
                            </p>
                            <p v-if="userInfo.sports_frequency == 1">
                              每周1-2次
                            </p>
                            <p v-if="userInfo.sports_frequency == 2">
                              每周3-4次
                            </p>
                            <p v-if="userInfo.sports_frequency == 3">
                              每周5-7次
                            </p>
                            <p v-if="userInfo.sports_frequency == null || ''">
                              -
                            </p>
                          </td>
                          <td></td>
                        </tr> -->
                        <tr>
                          <td>吸烟情况：</td>
                          <td>
                            <p v-if="userInfo.smoke_state == 1">从不吸烟</p>
                            <p v-if="userInfo.smoke_state == 2">已戒烟</p>
                            <p v-if="userInfo.smoke_state == 3">偶尔吸烟</p>
                            <p v-if="userInfo.smoke_state == 4">经常吸烟</p>
                            <p v-if="userInfo.smoke_state == 5">二手烟困扰</p>
                            <p v-if="userInfo.smoke_state == null || ''">-</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>烟龄：</td>
                          <td>
                            <p>
                              {{
                                userInfo.smoke_years
                                  ? userInfo.smoke_years
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>戒烟龄：</td>
                          <td>
                            <p>
                              {{
                                userInfo.smoke_quit_years
                                  ? userInfo.smoke_quit_years
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>饮酒情况：</td>
                          <td>
                            <p v-if="userInfo.drink_state == 1">从不</p>
                            <p v-if="userInfo.drink_state == 2">偶尔</p>
                            <p v-if="userInfo.drink_state == 3">经常</p>
                            <p v-if="userInfo.drink_state == 4">酗酒</p>
                            <p v-if="userInfo.drink_state == null || ''">-</p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>酒龄：</td>
                          <td>
                            <p>
                              {{
                                userInfo.drink_years
                                  ? userInfo.drink_years
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>戒酒龄：</td>
                          <td>
                            <p>
                              {{
                                userInfo.drink_quit_years
                                  ? userInfo.drink_quit_years
                                  : "-"
                              }}
                            </p>
                          </td>
                          <td></td>
                        </tr>
                      </table>
                    </div>
                  </van-tab>
                </van-tabs>
              </div>
              <!-- 处方记录 -->
              <div class="labels">
                <div class="label">
                  <span class="l-span1"></span>
                  <span class="l-span2">处方记录</span>
                </div>
                <div
                  v-if="recipeList.length > 0"
                  class="toEdit"
                  @click="toLoadingRecipe"
                >
                  <span>更多&gt;</span>
                </div>
              </div>
              <!-- 处方记录列表 -->
              <div
                class="recipe_list"
                v-if="recipeList && recipeList.length == 0"
              >
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
              </div>
              <!-- 回访记录 -->
              <div class="labels">
                <div class="label">
                  <span class="l-span1"></span>
                  <span class="l-span2">回访记录</span>
                </div>
                <div
                  v-if="returnVisitList.length > 0"
                  class="toEdit"
                  @click="toLoadingReturnVisit"
                >
                  <span>更多&gt;</span>
                </div>
              </div>
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
                    <p class="visit_p1">回访时间：{{ item.create_date }}</p>
                    <p class="visit_p2">回访人：{{ item.revisiter }}</p>
                  </div>
                  <div class="visitable">
                    <table>
                      <tr>
                        <td width="55%">
                          <p>
                            <span>回访类型：</span>
                            <span v-if="item.content == 1"
                              >健康照顾方案大方</span
                            >
                            <span v-if="item.content == 2"
                              >健康照顾方案小方</span
                            >
                            <span v-if="item.content == 3">慢病回访</span>
                            <span v-if="item.content == 4">活动回访</span>
                            <span v-if="item.content == 5">器械售后回访</span>
                            <span v-if="item.content == 6">近效期回访</span>
                            <span v-if="item.content == 7">久未交易回访</span>
                            <span v-if="item.content == 8">新办会员回访</span>
                            <span v-if="item.content == 9"
                              >商品会员生命周期回访</span
                            >
                            <span v-if="item.content == 10">阿胶回访</span>
                            <span v-if="item.content === null || ''">-</span>
                          </p>
                        </td>
                        <td>姓名：{{ archivesName }}</td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            <span>接通类型：</span>
                            <span v-if="item.through_type == '1'">接通</span>
                            <span v-if="item.through_type == '2'">拒接</span>
                            <span v-if="item.through_type == '3'"
                              >接通后挂断</span
                            >
                            <span v-if="item.through_type == '4'">停机</span>
                            <span v-if="item.through_type == '5'">关机</span>
                            <span v-if="item.through_type == '6'"
                              >无法接通</span
                            >
                            <span v-if="item.through_type == '7'"
                              >无人接听</span
                            >
                            <span v-if="item.through_type == '8'">空号</span>
                            <span v-if="item.through_type == '9'"
                              >号码有误</span
                            >
                            <span v-if="item.through_type == null || ''"
                              >-</span
                            >
                          </p>
                        </td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="nomore">没有更多了</div>
            </div>
            <!-- 底部浮动 -->
            <div class="footer">
              <div @click="toAddNewReturn">新增回访</div>
              <div @click="toAddNewArchives">新增档案</div>
            </div>
          </div>
        </div>
      </div>
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
              <td width="35%">回访类型：</td>
              <td>
                <p>
                  <span v-if="returnDetail.content == '1'"
                    >健康照顾方案大方</span
                  >
                  <span v-if="returnDetail.content == '2'"
                    >健康照顾方案小方</span
                  >
                  <span v-if="returnDetail.content == '3'">慢病回访</span>
                  <span v-if="returnDetail.content == '4'">活动回访</span>
                  <span v-if="returnDetail.content == '5'">器械售后回访</span>
                  <span v-if="returnDetail.content == '6'">近效期回访</span>
                  <span v-if="returnDetail.content == '7'">久未交易回访</span>
                  <span v-if="returnDetail.content == '8'">新办会员回访</span>
                  <span v-if="returnDetail.content == '9'"
                    >商品会员生命周期回访</span
                  >
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
                  <span v-if="returnDetail.through_type == '3'"
                    >接通后挂断</span
                  >
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
                <p v-if="returnDetail.is_detection == '1'">有监测器械</p>
                <p v-if="returnDetail.is_detection == '2'">无监测器械</p>
                <p v-if="returnDetail.is_detection == null || ''">-</p>
              </td>
            </tr>
            <tr>
              <td>是否长期服药：</td>
              <td>
                <p v-if="returnDetail.is_medicine == '1'">是</p>
                <p v-if="returnDetail.is_medicine == '2'">否</p>
                <p v-if="returnDetail.is_medicine == null || ''">-</p>
              </td>
            </tr>
            <tr>
              <td>有无不良反应：</td>
              <td>
                <p v-if="returnDetail.has_adversereactions == '1'">有</p>
                <p v-if="returnDetail.has_adversereactions == '2'">无</p>
                <p v-if="returnDetail.has_adversereactions == null || ''">-</p>
              </td>
            </tr>
            <!-- <tr>
              <td>服药依从性：</td>
              <td>
                <p v-if="returnDetail.medcompliance == '1'">规律</p>
                <p v-if="returnDetail.medcompliance == '2'">间断</p>
                <p v-if="returnDetail.medcompliance == '3'">不服药</p>
                <p v-if="returnDetail.medcompliance == null || ''">-</p>
              </td>
            </tr> -->
            <tr>
              <td>病情缓解情况：</td>
              <td>
                <p v-if="returnDetail.situation == '1'">缓解</p>
                <p v-if="returnDetail.situation == '2'">无明显变化</p>
                <p v-if="returnDetail.situation == '3'">加重</p>
                <p v-if="returnDetail.situation == null || ''">-</p>
              </td>
            </tr>
            <!-- <tr>
              <td>自我监测：</td>
              <td>
                <p v-if="returnDetail.selfmonitoring == '1'">是</p>
                <p v-if="returnDetail.selfmonitoring == '2'">否</p>
                <p v-if="returnDetail.selfmonitoring == null || ''">-</p>
              </td>
            </tr> -->
            <!-- <tr>
              <td>日均吸氧时间：</td>
              <td>
                {{
                  returnDetail.oxygeninhalation_time
                    ? returnDetail.oxygeninhalation_time
                    : "-"
                }}
              </td>
            </tr> -->
            <!-- <tr>
              <td>脉搏：</td>
              <td>{{ returnDetail.pulse ? returnDetail.pulse : "-" }}</td>
            </tr> -->
            <tr>
              <td>餐前血糖：</td>
              <td>
                {{
                  returnDetail.before_bloodsugar
                    ? returnDetail.before_bloodsugar
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <td>餐后血糖：</td>
              <td>
                {{
                  returnDetail.after_bloodsugar
                    ? returnDetail.after_bloodsugar
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <td>高压值：</td>
              <td>
                {{
                  returnDetail.bloodpressure_h
                    ? returnDetail.bloodpressure_h
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <td>低压值：</td>
              <td>
                {{
                  returnDetail.bloodpressure_l
                    ? returnDetail.bloodpressure_l
                    : "-"
                }}
              </td>
            </tr>
            <tr>
              <td>不满意描述：</td>
              <td>
                {{
                  returnDetail.meet_describe ? returnDetail.meet_describe : "-"
                }}
              </td>
            </tr>
            <tr>
              <td>意见描述：</td>
              <td>
                {{
                  returnDetail.opinion_describe
                    ? returnDetail.opinion_describe
                    : "-"
                }}
              </td>
            </tr>
            <!-- <tr>
              <td>医生结论：</td>
              <td>
                {{
                  returnDetail.doctorconclusion
                    ? returnDetail.doctorconclusion
                    : "-"
                }}
              </td>
            </tr> -->
            <tr>
              <td>回访小结：</td>
              <td>{{ returnDetail.summary ? returnDetail.summary : "-" }}</td>
            </tr>
            <tr>
              <div>回访药品：</div>
            </tr>
            <tr v-if="drugList.length == 0" class="drug_list drug_lists">
              <td>此次回访暂无药品</td>
            </tr>
            <tr
              v-else
              v-for="item in drugList"
              :key="item.goods_name"
              class="drug_list"
            >
              <td>{{ item.goods_name }}</td>
              <td>{{ item.spec }}</td>
              <td>{{ item.usage }}</td>
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
import loading from "../loading/loading";
import { Toast, Notify, Dialog } from "vant";
import {
  getUserHomeList,
  getUserTypeId,
  getRecipeList,
  getRecipeDetail,
  getReturnList,
} from "../../api/index.js";
export default {
  components: {
    loading,
  },
  data() {
    return {
      nim: require("../../assets/microimg.jpg"),
      nim: require("../../assets/notgold.jpg"),
      microimgUrl: require("../../assets/microimg.jpg"), //企微图片
      noarchive: require("../../assets/noarchive.png"), //企微图片
      index: 0, //控制标签展示
      memberid: "111", //存放会员ID
      user_type: "111", //保存用户类型
      userId: "", //企微用户ID
      Selected: "",
      recordID: null, //档案ID
      activeTitle: 0, //控制tab标签内容切换
      options: [],
      userInfoList: null, //保存所有用户列表
      userInfo: {}, //保存要展示用户信息
      allergyStr: "", //保存过敏史的字符串
      upGradeUrl: require("../../assets/notgold.jpg"), //非会员图片
      recipeList: [], //处方订单列表
      returnVisitList: [], //回访列表
      drugList: [], //药品列表
      archivesName: "", //档案人姓名
      archiveDetail: {}, //弹框展示档案详情
      returnDetail: {}, //弹框展示回访详情
      isShowArchiveDetail: false, //控制显示处方详情
      isShowReturnDetail: false, //控制显示回访详情
      eatHabitValue: "", //保存饮食习惯的值
    };
  },
  created() {
    // this.getUserId(this.$route.query.userId);
    // this.getUserRelationMember("3238016");
    this.memberid = this.$route.query.userId;
    this.getUserRelationMember(this.$route.query.userId);
  },
  methods: {
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
    // 关闭处方弹框
    closeRicipe() {
      this.isShowArchiveDetail = false;
    },
    // 关闭回访弹框
    closeReturn() {
      this.isShowReturnDetail = false;
    },
    // 弹窗展示回访详情
    toPopupReturn(val) {
      this.returnDetail = val;
      // 切割药品
      this.drugList = [];
      if (val.goods_name != null) {
        if (val.goods_name.indexOf("|") != -1) {
          var name_arr = val.goods_name.split("|");
          var spec_arr = val.spec.split("|");
          var usage_arr = val.usage.split("|");
          name_arr.forEach((item, index) => {
            var obj = {};
            obj.goods_name = item;
            obj.spec = spec_arr[index];
            obj.usage = usage_arr[index];
            this.drugList.push(obj);
          });
        } else {
          var obj = {};
          obj.goods_name = val.goods_name;
          obj.spec = val.spec;
          obj.usage = val.usage;
          this.drugList.push(obj);
        }
        console.log(this.drugList, "this.drugList");
      }
      this.isShowReturnDetail = true;
      console.log(this.isShowReturnDetail, "this.issh");
    },
    // 显示3条处方记录 archives_id传入档案ID
    togetRecipeList(recordId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getUserFamilyRemoteListService",
        // record_id: "249", //写死数据
        record_id: recordId,
        page: "1",
        pageSize: "3",
        timestamp,
        sign,
      };
      getRecipeList(query)
        .then((res) => {
          if (res.statusCode === "1") {
            this.recipeList = res.dataList;
          }
        })
        .catch((err) => {});
    },
    // 显示3条回访记录 archives_id传入档案ID
    togetReturnVisitList(recordId) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getUserFamilyVisitListService",
        // record_id: "249", //写死数据
        record_id: recordId,
        page: "1",
        pageSize: "3",
        timestamp,
        sign,
      };
      getReturnList(query)
        .then((res) => {
          if (res.statusCode === "1") {
            this.returnVisitList = res.dataList;
          }
        })
        .catch((err) => {});
    },
    // 获取会员关联用户
    getUserRelationMember(memberid) {
      var timestamp = new Date().getTime();
      var sign = this.getSign(timestamp);
      var query = {
        method: "getUserHomeList",
        // memberid: "3238016", //测试用固定写法`
        memberid: memberid, //动态传入
        timestamp,
        sign,
      };
      getUserHomeList(query)
        .then((res) => {
          var statusCode = res.statusCode;
          if (statusCode != 1) {
            var message = res.message;
            Toast.fail({ message: message, duration: 2000 });
            return false;
          }
          var arr = res.dataList;
          this.userInfoList = arr;
          this.userInfo = arr[0]; //接受用户信息
          console.log(arr[0].archives_id);
          this.archivesName = this.userInfo.real_name;
          this.recordID = this.userInfo.archives_id;
          this.togetRecipeList(arr[0].archives_id); //获取处方
          this.togetReturnVisitList(arr[0].archives_id); //获取回访
          arr.forEach((item) => {
            var obj = {};
            obj.text = item.real_name;
            obj.value = item.archives_id;
            this.options.push(obj);
          });
          console.log(res, ".....xxxxxx");
          this.dealMedicineType(this.userInfo.allergy);
          this.dealEatHabit(this.userInfo.eat_habit);
        })
        .catch((err) => {
          console.log(err);
          console.log("xxx3");
          console.log(err, "列表cache");
        });
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
        if (res.code === "1") {
          that.user_type = res.data.user_type;
          if (res.data.member_id != "") {
            that.memberid = res.data.member_id;
            that.getUserRelationMember(res.data.member_id);
          } else {
            // that.user_type = "2";
          }
        } else {
          this.$router.push({ path: "/500" });
        }
      });
    },
    // 处理药物过敏字符串
    dealMedicineType(str) {
      var arr = str.split(",");
      var string = "";
      arr.forEach((item) => {
        if (item == "0") {
          this.allergyStr = "无";
        }
        if (item == "1") {
          string += "青霉素";
        }
        if (item == "2") {
          string += " 磺胺类";
        }
        if (item == "3") {
          string += " 头孢类";
        }
        if (item == "4") {
          string += " 链霉素";
        }
        if (item == "5") {
          string += " 解热镇痛类";
        }
        if (item == "20") {
          string += " 其他";
        }
      });
      this.allergyStr = string;
    },
    // 处理饮食习惯
    dealEatHabit(val) {
      if (val != null && val != "" && val.indexOf(",") != -1) {
        var arr = val.split(",");
        var str = "";
        arr.forEach((item) => {
          if (item == "0") {
            str += "均衡,";
          } else if (item == "1") {
            str += "偏淡,";
          } else if (item == "2") {
            str += "偏油,";
          } else if (item == "3") {
            str += "偏辣,";
          } else if (item == "4") {
            str += "偏甜,";
          } else if (item == "5") {
            str += "偏咸,";
          }
        });
        this.eatHabitValue = str.slice(0, -1);
      } else {
        if (val == "0") {
          this.eatHabitValue = "均衡";
        } else if (val == "1") {
          this.eatHabitValue = "偏淡";
        } else if (val == "2") {
          this.eatHabitValue = "偏油";
        } else if (val == "3") {
          this.eatHabitValue = "偏辣";
        } else if (val == "4") {
          this.eatHabitValue = "偏甜";
        } else if (val == "5") {
          this.eatHabitValue = "偏咸";
        }
      }
    },
    // 改变userinfo
    toChangeUser(val) {
      console.log(val, "xxxx");
      this.userInfoList.forEach((item) => {
        if (val == item.archives_id) {
          this.userInfo = item;
        }
      });
      this.archivesName = this.userInfo.real_name;
      this.recordID = this.userInfo.archives_id;
      this.togetRecipeList(this.userInfo.archives_id); //获取处方
      this.togetReturnVisitList(this.userInfo.archives_id); //获取回访
      this.dealMedicineType(this.userInfo.allergy);
      this.dealEatHabit(this.userInfo.eat_habit);
      this.dealMedicineType(this.userInfo.allergy);
    },
    //加密标识
    getSign(timeStamp) {
      var token = "Zz99GmPCGZ3trYebcimb1JrgsrDstnIY";
      var sign = this.$md5(token + timeStamp);
      return sign;
    },
    changeTab(idx) {
      this.index = idx; //通过改变index改变tab页
    },
    // 跳转到编辑档案页
    toEditArchives(val) {
      this.$router.push({
        path: "/EditArchives",
        query: { userData: val, memberId: this.memberid },
      });
    },
    // 跳转新增家庭档案
    toAddNewArchives() {
      this.$router.push({
        path: "/AddNewArchives",
        query: { memberId: this.memberid },
      });
    },
    //跳转新增回访
    toAddNewReturn() {
      this.$router.push({
        path: "/AddNewReturn",
        query: { recodeId: this.userInfo.archives_id },
      });
    },
    // 跳转更多处方
    toLoadingRecipe() {
      console.log(this.recipeList.length);
      if (this.recipeList && this.recipeList.length > 0) {
        this.$router.push({
          path: "/LoadingRecipe",
          query: { recodeId: this.userInfo.archives_id },
          // query: { recodeId: "249" },
        });
      } else {
        Toast.fail({ message: "暂无处方", duration: 550 });
      }
    },
    // 跳转更多回访
    toLoadingReturnVisit() {
      if (this.returnVisitList && this.returnVisitList.length > 0) {
        this.$router.push({
          path: "/LoadingReturnVisit",
          query: {
            recodeId: this.userInfo.archives_id,
            archivesName: this.userInfo.real_name,
          },
        });
      } else {
        Toast.fail({ message: "暂无回访", duration: 550 });
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
          function(res) {
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
  },
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.microimg {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
// 没有档案
.noarchive {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 50%;
  height: 30%;
  font-size: 12px;
  text-align: center;

  p {
    margin: 8px 0 13px 0;
    font-size: 12px;
    font-weight: bold;
  }
  div {
    background-color: #249cd3;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
}

.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 889;
  background: #fff;
  top: 0px;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  /deep/ .van-dropdown-item {
    z-index: 999;
  }
  .selectNumber {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    > span {
      display: inline-block;
      font-size: 14px;
      color: #333;
      font-weight: 550;
      height: 20px;
      line-height: 19px;
    }
    /deep/ .van-dropdown-menu__bar {
      height: 24px;
      box-shadow: none;
    }
    /deep/ .van-dropdown-menu__title {
      font-size: 13px;
    }
  }
}
// 非会员图片样式
.notNumber {
  cursor: pointer;
  img {
    width: 100%;
  }
}
// 超出滚动显示
.content {
  box-sizing: border-box;
  padding: 50px 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  top: 0;
}
// 会员标签
.labels {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  padding: 0 10px;
  background-color: #fff;
  .toEdit {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
    color: #4a90e2;
  }
}
.label {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  .l-span1 {
    display: inline-block;
    width: 4px;
    height: 30%;
    background-color: #4a90e2;
  }
  .l-span2 {
    font-size: 16px;
    margin-left: 6px;
  }
}
// 标签切换内容
.texts {
  width: 100%;
  min-height: 240px;
  margin: 10px auto;
  font-size: 12px;
  background-color: #fff;
  table {
    width: 75%;
    margin: 0 auto;
    padding: 15px 0;
    // background-color: #fff;
  }
  tr {
    height: 50px;
    p {
      color: #808080;
    }
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
// 处方记录列表
.recipe_list {
  width: 100%;
  background-color: #f7f8fa;
  overflow: hidden;
  .recipe_list_span {
    font-size: 12px;
    color: #aaa;
    display: block;
    text-align: center;
    line-height: 50px;
  }
  .recipe_list_box {
    width: 80%;
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
          text-indent: 20px;
        }
      }
    }
  }
}
// 处方弹框样式
.recipe-wrapper {
  position: fixed;
  z-index: 999;
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
        width: 13px;
        height: 13px;
        font-size: 15px;
        line-height: 12px;
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
// 回访弹框样式
.return-wrapper {
  position: fixed;
  z-index: 999;
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
        border: 1px solid #666;
        color: #666;
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
      .drug_list,
      .drug_lists {
        width: 300px;
        font-size: 10px;
        color: #666;
        height: 15px;
        td {
          width: 33%;
          line-height: 14px;
          padding-left: 3px;
        }
      }
      .drug_lists {
        td {
          width: 50%;
        }
      }
      tr {
        height: 30px;
        td {
          line-height: 26px;
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
  background-color: #f7f8fa;
  overflow: hidden;
  .return-list_span {
    font-size: 12px;
    color: #aaa;
    width: 100%;
    display: block;
    text-align: center;
    line-height: 50px;
  }
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
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
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
    box-sizing: border-box;
    padding-left: 10px;
    td {
      height: 35px;
    }
  }
}

.nomore {
  font-size: 12px;
  line-height: 19px;
  color: #9b9b9b;
  text-align: center;
  margin: 20px 0 20px 0;
}
// 底部添加跟进
.footer {
  font-size: 12px;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 888;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #dcdfe6;
  div {
    cursor: pointer;
    width: 35%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #808080;
    box-sizing: border-box;
  }
}
.recipe-overlay,
.return-overlay {
  z-index: 999;
}
</style>
