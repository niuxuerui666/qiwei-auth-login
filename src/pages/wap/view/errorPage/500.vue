<template>
  <div class="code  500-page">
    <div class="img-box">
      <img class="img" src="../../assets/img/500.png" alt="" />
      <div class="img-text">数据加载失败</div>
      <div class="img-back-btn" @click="refresh()">重新加载</div>
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
  methods: {
    refresh() {
      // location.replace(document.referrer);
      // window.location.reload();
      //   this.$router.push("/MarkingJump");
       this.$router.go(-1);
    },
  },
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
      max-width: 60%;
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .img-text {
      flex-shrink: 0;
      color: #4d4d4d;
      text-align: center;
      font-size: 14px;
      margin-bottom: 30px;
    }

    .img-back-btn {
      flex-shrink: 0;
      color: #4d4d4d;
      text-align: center;
      font-size: 14px;
      width: 70%;
      margin: 0 auto;
      height: 50px;
      line-height: 50px;
      background: #fed321;
      border-radius: 40px;
      margin-bottom: 30px;
    }
  }
}
</style>
