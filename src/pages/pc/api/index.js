import request from "../utils/request";
import config from "../utils/config";
import qs from "qs";

var env = process.env.NODE_ENV;
if (env == "development") {
  //开发环境
  var host_ = "/api";
  console.log("开发环境");
} else if (env == "production") {
  //上线环境
  var host_ = config.QUOTE_SERVER_URI;
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
