import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "Home" */ './view/Home.vue'),
  },
  {
    //首页
    path: '/Home',
    component: () => import(/* webpackChunkName: "Home" */ './view/Home.vue'),
    meta: { title: '首页' ,class:"首页",roles:[],permission:true,keepAlive:false},
    name:"Home"
  },
  // {
  //   //报价填写  运营商
  //   path: '/offerAdd',
  //   component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/offerAdd.vue'),
  //   meta: { title: '报价填写' ,class:"报价",roles:[],permission:true},
  //   name:"offerAdd"
  // },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
