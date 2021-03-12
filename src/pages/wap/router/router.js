import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "Home" */
  //       "../view/MarkingJump/MarkingJump.vue"
  //     ),
  // },
  // 区分会员画像
  {
    path: "/MarkingJump",
    component: () =>
      import(
        /* webpackChunkName: "MarkingJump" */
        "../view/MarkingJump/MarkingJump.vue"
      ),
    name: "MarkingJump",
  },
  // 区分家庭档案
  {
    path: "/ArchiveJump",
    component: () =>
      import(
        /* webpackChunkName: "ArchiveJump" */
        "../view/MarkingJump/ArchiveJump.vue"
      ),
    name: "ArchiveJump",
  },
  // 区分会员订单
  {
    path: "/OrderJump",
    component: () =>
      import(
        /* webpackChunkName: "OrderJump" */
        "../view/MarkingJump/OrderJump.vue"
      ),
    name: "OrderJump",
  },
  //商品中心  start
  {
    path: "/CommodityCenter",
    component: () =>
      import(
        /* webpackChunkName: "CommodityCenter" */
        "../view/CommodityCenter/CommodityCenter.vue"
      ),
    name: "CommodityCenter",
  },
  //商品中心  end

  // 客户画像 start
  {
    path: "/CustomerPortrait",
    component: () =>
      import(
        /* webpackChunkName: "CustomerPortrait" */
        "../view/CustomerPortrait/CustomerPortrait.vue"
      ),
    name: "CustomerPortrait",
  },
  {
    // 一键建群
    path: "/AKeyBuildingGroup",
    component: () =>
      import(
        /* webpackChunkName: "AKeyBuildingGroup" */
        "../view/CustomerPortrait/AKeyBuildingGroup.vue"
      ),
    name: "AKeyBuildingGroup",
  },
  {
    // 群聊
    path: "/GroupChat",
    component: () =>
      import(
        /* webpackChunkName: "GroupChat" */
        "../view/CustomerPortrait/GroupChat.vue"
      ),
    name: "GroupChat",
  },
  {
    // 新增档案
    path: "/AddNewArchives",
    component: () =>
      import(
        /* webpackChunkName: "AddNewArchives" */ "../view/FamilyArchives/AddNewArchives.vue"
      ),
    name: "AddNewArchives",
  },
  {
    // 编辑档案
    path: "/EditArchives",
    component: () =>
      import(
        /* webpackChunkName: "EditArchives" */ "../view/FamilyArchives/EditArchives.vue"
      ),
    name: "EditArchives",
  },
  {
    // 新增回访
    path: "/AddNewReturn",
    component: () =>
      import(
        /* webpackChunkName: "AddNewReturn" */ "../view/FamilyArchives/AddNewReturn.vue"
      ),
    name: "AddNewReturn",
  },
  {
    // 更多处方
    path: "/LoadingRecipe",
    component: () =>
      import(
        /* webpackChunkName: "LoadingRecipe" */ "../view/FamilyArchives/LoadingRecipe.vue"
      ),
    name: "LoadingRecipe",
  },
  {
    // 更多回访
    path: "/LoadingReturnVisit",
    component: () =>
      import(
        /* webpackChunkName: "LoadingReturnVisit" */ "../view/FamilyArchives/LoadingReturnVisit.vue"
      ),
    name: "LoadingReturnVisit",
  },
  // 档案
  {
    path: "/FamilyArchives",
    component: () =>
      import(
        /* webpackChunkName: "FamilyArchives" */ "../view/FamilyArchives/FamilyArchives.vue"
      ),
    name: "FamilyArchives",
  },
  {
    // 跟进
    path: "/FollowUp",
    component: () =>
      import(
        /* webpackChunkName: "FollowUp" */
        "../view/CustomerPortrait/FollowUp.vue"
      ),
    name: "FollowUp",
  },
  {
    // 测试
    path: "/test",
    component: () =>
      import(
        /* webpackChunkName: "test" */
        "../view/test.vue"
      ),
    name: "test",
  },
  {
    // 档案详情
    path: "/FileDetail",
    component: () =>
      import(
        /* webpackChunkName: "FileDetail" */
        "../view/CustomerPortrait/FileDetail.vue"
      ),
    name: "FileDetail",
  },
  {
    // 会员订单
    path: "/MemberOrder",
    component: () =>
      import(
        /* webpackChunkName: "MemberOrder" */
        "../view/MemberOrder/MemberOrder.vue"
      ),
    name: "MemberOrder",
  },
  // 客户画像 end

  {
    path: "/401",
    name: "page401",
    component: () => import("../view/errorPage/401.vue"),
  },
  {
    path: "/404",
    name: "page404",
    component: () => import("../view/errorPage/404.vue"),
  },
  {
    path: "/500",
    name: "page500",
    component: () => import("../view/errorPage/500.vue"),
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "hash",
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
