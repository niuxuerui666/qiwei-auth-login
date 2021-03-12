import Cookies from "js-cookie";

const isLogin = {
  setCode() {
    Cookies.set("code", "设置的code!!!!");
  },
  hasCode() {
    console.log("获取cookie", Cookies.get("code"));
    return Cookies.get("code");
  },
};

export default isLogin;
