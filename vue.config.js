var glob = require("glob");

function getPagesInfo() {
  let pages = {};
  glob.sync("src/pages/**/main.js").map((entry) => {
    // console.log("扫描到的入口文件",entry)
    let title = entry.slice(10, -8);
    // console.log("扫描到的入口名字",title);
    // console.log("扫描位置",entry.slice(0, -8));
    pages[title] = {
      entry,
      template: `${entry.slice(0, -8)}/index.html`,
      filename: `${title}.html`,
    };
  });
  return pages;
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://router.111yao.com",
        changeOrigin: true,
        headers: {
          Referer: "https://router.111yao.com",
        },
        secure: false,
        pathRewrite: {
          "/api": "",
        },
      },
      "/testapi": {
        target: "http://testrouter.111yao.com",
        changeOrigin: true,
        headers: {
          Referer: "http://testrouter.111yao.com",
        },
        secure: false,
        pathRewrite: {
          "/testapi": "",
        },
      },

      "/weixinsdk": {
        target: "https://www.dstyao.com",
        headers: {
          Referer: "https://www.dstyao.com",
        },
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "/weixinsdk": "",
        },
      },
      "/foreign": {
        target: "https://foreign-test.111yao.cn:8443",
        changeOrigin: true,
        headers: {
          Referer: "https://foreign-test.111yao.cn:8443",
        },
        secure: false,
        pathRewrite: {
          "/foreign": "",
        },
      },
      "/testmanage": {
        target: "https://testmanage.hospital.111yao.com",
        changeOrigin: true,
        headers: {
          Referer: "https://testmanage.hospital.111yao.com",
        },
        secure: false,
        pathRewrite: {
          "/testmanage": "",
        },
      },

      // "/crmapitest": {
      //   target: "http://crm-api-test.111yao.cn:7001",
      //   changeOrigin: true,
      //   headers: {
      //     Referer: "http://crm-api-test.111yao.cn:7001",
      //   },
      //   secure: false,
      //   pathRewrite: {
      //     "/crmapitest": "",
      //   },
      // },
      '/crmapitest': {
        target: 'http://crm-api-test.111yao.cn:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/crmapitest': ''
        }
      }

    },
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  lintOnSave: false,
  //在vue-cli3中使用 amfe-flexible 和 px2rem-loader
  chainWebpack: (config) => {
    config.module
      .rule("scss")
      .test(/\.scss$/)
      .oneOf("vue")
      .use("px2rem-loader")
      .loader("px2rem-loader")
      .before("postcss-loader") // this makes it work.
      .options({
        remUnit: 37.5,
        remPrecision: 8
      })
      .end();
  },
  //配置多入口
  // pages: {
  //   pageA: {
  //     entry: "./src/pages/wap/main.js",
  //     template: "src/pages/wap/index.html",
  //     filename: "wap.html",
  //   },
  //   pageB: {
  //     entry: "./src/pages/pc/main.js",
  //     template: "src/pages/pc/index.html",
  //     filename: "pc.html",
  //   },
  // },
  pages: getPagesInfo(),
};