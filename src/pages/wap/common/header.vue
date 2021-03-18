<template>
  <div class="con">
    <div class="con-son">
      <div class="label">
        <span class="l-span1"></span>
        <!-- 填充内容 -->
        <slot></slot>
      </div>
      <div class="closebtn" @click="goBack()">关闭</div>
    </div>
  </div>
</template>

<script>
export default {
  // name:'child'
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.con {
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  .con-son {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
// 会员标签
.label {
  line-height: 30px;
  .l-span1 {
    display: inline-block;
    width: 4px;
    height: 13px;
    background-color: #3399ff;
  }
  .l-span2 {
    font-size: 16px;
    margin-left: 6px;
  }
}
.closebtn {
  color: #169bd5;
  font-size: 15px;
  line-height: 30px;
}
</style>
