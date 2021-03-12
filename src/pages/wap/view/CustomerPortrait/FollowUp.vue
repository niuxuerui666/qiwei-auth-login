<template>
  <div>
    <!-- 添加跟进 -->
    <child>
      <span class="l-span2">添加跟进</span>
    </child>
    <!-- 编辑内容区 -->
    <div class="content">
      <textarea name="" id="txt" :placeholder="text"> </textarea>
    </div>
    <!-- 底部按钮 -->
    <div class="footer">
      <div class="btn1">添加</div>
      <div class="btn2">取消</div>
    </div>
  </div>
</template>

<script>
import Child from "../../common/header";
export default {
  data(){
    return{
      text:`请输入要添加的跟进信息，添加成功后将出现在跟进记录中～`
    }
  },
  components: {
    child: Child,
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 345px;
  height: 300px;
  margin: 0 auto;
}
#txt {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 300px;
  font-size: 15px;
  resize: none;
  border: 1px solid #8f8f8f;
}
// 底部按钮
.footer {
  font-size: 14px;
  width: 345px;
  height: 40px;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  div {
    width: 40%;
    border-radius: 4px;
    line-height: 40px;
    text-align: center;
  }
  .btn1 {
    color: #fff;
    background-color: #169bd5;
  }
  .btn2 {
    border: 1px solid #797979;
    box-sizing: border-box;
    line-height: 39px;
  }
}
</style>