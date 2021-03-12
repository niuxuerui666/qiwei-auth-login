import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

var env = process.env.NODE_ENV;
if (env == "development") {
  //开发环境
  var host_ = "/api";
  var host_1 = "/testapi"
  var host_2 = "/foreign"
  var host_3 = "/testmanage"
  var host_4 = "/crmapitest"
  console.log("开发环境");
} else if (env == "production") {
  //上线环境
  var host_ = config.QUOTE_SERVER_URI;
  var host_1 = config.QUOTE_TESTAPI_URI;
  var host_2 = config.QUOTE_FOREIGN_URI;
  var host_3 = config.QUOTE_TESTMANAGE_URI;
  var host_4 = config.QUOTE_CRMAPITEST_URI;
  console.log("上线环境");
}

// export const fetchData = (query) => {
//   return request({
//     url: "./table.json",
//     method: "get",
//     params: query,
//   });
// };
// export const fetchSDK = (query) => {
//   return request({
//     url: "/api",
//     method: "post",
//     data: query,
//   });
// };

export const getQiMoGoodsList = (query) => {
  return request({
    url: host_ + "/sltRouter",
    method: "post",
    data: qs.stringify(query),
  });
};
export const getOnlinePlanListService = (query) => {
  return request({
    url: host_ + "/sltRouter",
    method: "post",
    data: qs.stringify(query),
  });
};
// 获取客户信息
export const getCustomerInfo = (query) => {
  return request({
    url: host_2 + "/get/crm/userinfo",
    // url:' https://foreign-test.111yao.cn:8443/get/crm/userinfo?data=253737375&type=1&wx_id=2',
    method: "get",
    params: query,
  });
};
// 获取侧边栏企微相关数据
export const getSideWechatInfo = (query) => {
  return request({
    url: host_2 + "/get/weChat/weChatData",
    // url:' https://foreign-test.111yao.cn:8443/get/crm/userinfo?data=253737375&type=1&wx_id=2',
    method: "get",
    params: query,
  });
};
// 获取群聊详情
export const getWechatDetail = (query) => {
  return request({
    url: host_2 + "/get/weChat/groupOf",
    // url:' https://foreign-test.111yao.cn:8443/get/crm/userinfo?data=253737375&type=1&wx_id=2',
    method: "get",
    params: query,
  });
};
// 搜索疾病
export const toSearchIllnessList = (query) => {
  return request({
    url: host_ + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 搜索药品
export const toSearchMedicineList = (query) => {
  return request({
    url: host_ + "/sltRouter",
    method: "get",
    params: query,
  });
};

//建群规则管理列表
export const getBuildGroupOfRules = (query) => {
  return request({
    url: host_2 + "/scrm/operate/list/with/pageinfo",
    method: "get",
    params: query,
  });
};

//根据外部联系人  userid，获取客户信息
export const getCustomerName = (query) => {
  return request({
    url: host_2 + "/wecom/customer/info",
    method: "get",
    params: query,
  });
};
//查询会员健康列表
export const getUserHomeList = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
//根据userID获取其他ID
export const getUserTypeId = (query) => {
  return request({
    url: host_2 + "/get/userdata/unionid",
    method: "get",
    params: query,
  });
};
// 新增家庭档案
export const addNewArchives = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 新增回访记录
export const addNewReturn = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 查看处方
export const getRecipeList = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 查看处方
export const getReturnList = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 查看处方详情
export const getRecipeDetail = (query) => {
  return request({
    url: host_1 + "/sltRouter",
    method: "get",
    params: query,
  });
};
// 会员订单
export const getMemberOrder = (query) => {
  return request({
    // url: host_2 + "/get/crm/userOrder",
    url: host_4 + "/api/order/getOrderList",
    method: "get",
    params: query,
  });
};


//reqNowLoginUse
export const reqNowLoginUser = (query) => {
  return request({
    url: host_2 + "/wecom/auth/query",
    method: "get",
    params: query,
  });
};