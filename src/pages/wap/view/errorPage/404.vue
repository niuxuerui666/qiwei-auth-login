<template>
  <div class="code  404-page">
    <div class="img-box">
      <img class="img" src="../../assets/img/404.png" alt="" />
      <div class="img-text">sorry~ 找不到页面啦！</div>
      <div class="img-back-btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.code {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img-box {
    flex-shrink: 0;
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .img {
      flex-shrink: 0;
      max-width: 70%;
      border-radius: 10px;
      margin-bottom:30px ;
    }

    .img-text {
      flex-shrink: 0;
      color: #4d4d4d;
      text-align: center;
      font-size: 16px;
      margin-bottom:20px ;
    }

    .img-back-btn {
      flex-shrink: 0;
      color: #999999;
      text-align: center;
      font-size: 14px;
      width: 70%;
      margin: 0 auto;
      height: 50px;
      line-height: 50px;
    //   background: #fed321;
      border-radius:40px;
      margin-bottom:40px ;
    }
  }
}
</style>
