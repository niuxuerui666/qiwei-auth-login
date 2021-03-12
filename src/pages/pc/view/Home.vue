<template>
  <div class="home">
    <div class="pc-header-body">
      <div class="bg-box"></div>
    </div>
    <div class="pc-header">
      <van-tabs class="footer-tabs" @click="onTabClick">
        <van-tab title="商品">
          <template #title>
            <div class="footer-icon">
              <!-- <van-icon name="shop-o" /> -->
              <span>商品 </span>
            </div>
          </template>
        </van-tab>
        <van-tab title="照顾方案">
          <template #title>
            <div class="footer-icon">
              <!-- <van-icon name="shop-collect-o" /> -->
              <span>照顾方案 </span>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 头部内容 -->
    <div class="header" v-if="showContent == 1">
      <div>
        <van-search
          v-model="query.keyword"
          shape="round"
          @search="onSearch"

          @cancel="onCancel"
          placeholder="请输入搜索关键词pc"
        />
      </div>
      <div style="margin-left:10px">
        <el-dropdown>
          <el-button  size="mini">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="margin-left:10px">
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
      <!-- <div class="menu-select-box">
        <div>
          <van-dropdown-menu class="menu-select">
            <van-dropdown-item
              v-model="query.searchType"
              :options="searchOption1"
            />
          </van-dropdown-menu>
        </div>
      </div> -->
    </div>
    <!-- 头部内容 -->
    <div class="header" v-if="showContent == 2">
        <div>
        <van-search
          v-model="query.keyword"
          shape="round"
          @search="onSearch"

          @cancel="onCancel"
          placeholder="请输入搜索关键词2222"
        />
      </div>
      <div style="margin-left:10px">
        <el-dropdown>
          <el-button  size="mini">
            更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="margin-left:10px">
        <el-button type="primary" size="mini">搜索</el-button>
      </div>
      <!-- <div class="menu-select-box">
        <div>
          <van-dropdown-menu class="menu-select">
            <van-dropdown-item
              v-model="query.searchType2"
              :options="searchOption2"
            />
          </van-dropdown-menu>
        </div>
      </div> -->
    </div>
    <!-- 内容部分 -->
    <div class="content" v-if="showContent == 1">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
    <!-- 内容部分 -->
    <div class="content" v-if="showContent == 2">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
    <!-- 底部导航 -->
    <div class="footer">
      <!-- <van-tabs class="footer-tabs" @click="onTabClick">
        <van-tab title="商品">
          <template #title>
            <div class="footer-icon">
              <van-icon name="shop-o" />
              <span>商品 </span>
            </div>
          </template>
        </van-tab>
        <van-tab title="照顾方案">
          <template #title>
            <div class="footer-icon">
              <van-icon name="shop-collect-o" />
              <span>照顾方案 </span>
            </div>
          </template>
        </van-tab>
      </van-tabs> -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      currentPage: 1,
      showContent: 1,
      query: {
        keyword: "",
        searchType: 1,
        searchType2: 1,
      },
      searchOption1: [
        { text: "商品名称", value: 1 },
        { text: "商品编号", value: 2 },
      ],
      searchOption2: [
        { text: "方案名称", value: 1 },
        { text: "方案编码", value: 2 },
      ],
    };
  },
  created() {
    this.getPhone();
  },
  mounted() {
    this.initPage();
  },

  components: {},

  computed: {},

  methods: {
    //获取当前环境
    getPhone() {
      var env = process.env.NODE_ENV;
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log("环境为：wap端");
        if (env == "development") {
          window.location.href = "http://localhost:8080/wap.html/";
        } else if (env == "production") {
          window.location.href =
            "http://testrouter.111yao.com/html5/weixinProductList/wap.html";
        }
      }
    },
    initPage() {},
    onTabClick(nth, title) {
      this.showContent = nth + 1;
      console.log("nth,title", nth, title);
    },
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      console.log("取消");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  > div {
    flex-shrink: 0;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .menu-select-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px; /*no*/

    > div {
      background: transparent;
      // box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12); /*no*/
    }
    .menu-select {
      /deep/ .van-dropdown-menu__bar {
        width: 35%;
        background: transparent;
        box-shadow: none;
      }
      /deep/ .van-dropdown-menu__title--active {
        color: #409eff;
      }
      /deep/ .van-dropdown-item__option--active .van-dropdown-item__icon {
        color: #409eff;
      }
      /deep/ .van-dropdown-item__option--active {
        color: #409eff;
      }
    }
  }
}

.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px; /*no */
  padding-bottom: 50px; /*no */
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
}
.content::-webkit-scrollbar {
  width: 4px; /*no */
  height: 5px; /*no */
}

.content::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.5);
  border-radius: 5px; /*no */
}

.content::-webkit-scrollbar-track {
  border-radius: 10px; /*no */
  width: 5px; /*no */
  height: 5px; /*no */
}
.pc-header-body {
  height: 50px;
  .bg-box{
    position: fixed;
    left: 0;
    top:0;
    width:100%;
    height: 40px;
    background:#f1f3f8;
  }
}
.pc-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 40px; /*no */
  background:#f1f3f8;
  .footer-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    /deep/ .van-icon {
      font-size: 18px; /*no */
    }
    span {
      font-size: 12px; /*no */
    }
  }

  .footer-tabs {
    height: 100%;
    /deep/ .van-tab{
      background: #f1f3f8;
    }
    /deep/ .van-tabs__wrap {
      height: 100%;
      .van-tab {
        font-size: 16px; /*no */
      }
      .van-tab--active {
        color: #4a90e2;
        font-size: 16px; /*no */
        font-weight: bolder;
      }
      .van-tabs__line {
        background:  #4a90e2;
        bottom: 4px;
      }
      .van-tabs__nav--line {
        padding-bottom: 0;
      }
    }
    /deep/ .van-tabs__content {
      font-size: 12px; /*no */
      display: none;
    }
  }
}
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;/*no*/
  border-top: 1px solid #eee;
  background: #fff;
  display: flex;
  align-items: center;
  .footer-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    /deep/ .van-icon {
      font-size: 18px; /*no */
    }
    span {
      font-size: 12px; /*no */
    }
  }

  .footer-tabs {
    height: 100%;
    /deep/ .van-tabs__wrap {
      height: 100%;
      .van-tab {
        font-size: 16px; /*no */
      }
      .van-tab--active {
        color: #4a90e2;
        font-size: 16px; /*no */
        font-weight: bolder;
      }
      .van-tabs__line {
        background: transparent;
      }
      .van-tabs__nav--line {
        padding-bottom: 0;
      }
    }
    /deep/ .van-tabs__content {
      font-size: 12px; /*no */
      display: none;
    }
  }
}
</style>
