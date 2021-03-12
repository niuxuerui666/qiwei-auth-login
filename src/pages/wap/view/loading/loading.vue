<template>
  <div id="loading">
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div class="ob-box">
          <div class="object" id="object_one"></div>
          <div class="object" id="object_two"></div>
          <div class="object" id="object_three"></div>
          <div class="object" id="object_four"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#loading {
  background-color: #fff;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  margin-top: 0px;
  top: 0px;
}

#loading-center {
  width: 100%;
  height: 100%;
  position: relative;
}

#loading-center-absolute {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 60px;
  width: 60px;
  margin-top: -30px;
  margin-left: -30px;
  -webkit-animation: loading-center-absolute 1s infinite;
  animation: loading-center-absolute 1s infinite;
}
.ob-box{
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
.object {
  width: 6px;
  height: 6px;
  background-color: #4a90e2;
  float: left;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
}

.object:nth-child(2n + 0) {
  margin-right: 0px;
}

#object_one {
  -webkit-animation: object_one 1s infinite;
  animation: object_one 1s infinite;
}

#object_two {
  -webkit-animation: object_two 1s infinite;
  animation: object_two 1s infinite;
}

#object_three {
  -webkit-animation: object_three 1s infinite;
  animation: object_three 1s infinite;
}

#object_four {
  -webkit-animation: object_four 1s infinite;
  animation: object_four 1s infinite;
}

@-webkit-keyframes loading-center-absolute {
  100% {
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loading-center-absolute {
  100% {
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes object_one {
  50% {
    -ms-transform: translate(10px, 10px);
    -webkit-transform: translate(10px, 10px);
    transform: translate(10px, 10px);
  }
}

@keyframes object_one { 
  50% {
    -ms-transform: translate(10px, 10px);
    -webkit-transform: translate(10px, 10px);
    transform: translate(10px, 10px);
  }
}

@-webkit-keyframes object_two {
  50% {
    -ms-transform: translate(-10px, 10px);
    -webkit-transform: translate(-10px, 10px);
    transform: translate(-10px, 10px);
  }
}

@keyframes object_two {
  50% {
    -ms-transform: translate(-10px, 10px);
    -webkit-transform: translate(-10px, 10px);
    transform: translate(-10px, 10px);
  }
}

@-webkit-keyframes object_three {
  50% {
    -ms-transform: translate(10px, -10px);
    -webkit-transform: translate(10px, -10px);
    transform: translate(10px, -10px);
  }
}

@keyframes object_three {
  50% {
    -ms-transform: translate(10px, -10px);
    -webkit-transform: translate(10px, -10px);
    transform: translate(10px, -10px);
  }
}

@-webkit-keyframes object_four {
  50% {
    -ms-transform: translate(-10px, -10px);
    -webkit-transform: translate(-10px, -10px);
    transform: translate(-10px, -10px);
  }
}

@keyframes object_four {
  50% {
    -ms-transform: translate(-10px, -10px);
    -webkit-transform: translate(-10px, -10px);
    transform: translate(-10px, -10px);
  }
}
</style>