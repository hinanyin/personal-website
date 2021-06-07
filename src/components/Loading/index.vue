<template>
  <div class="loading">
    <div class="box">
      <div class="heart"></div>
    </div>
    <div class="mes">····加载中····</div>
  </div>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped lang="less">
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
.loading {
  width: 100%;
  height: 100%;
  @center();
  flex-direction: column;
  .box {
    width: 50%;
    height: 50%;
    position: relative;
    animation: Heartbeat 2s infinite;
    animation-timing-function: linear;
    @center();
    flex-direction: column;
    .heart {
      width: 100px;
      height: 150px;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      background-color: #f47983;
      transform: rotateZ(45deg) translateX(25px);
      box-shadow: 0 2px 3px 0 rgb(0, 0, 0);
    }
    .heart::before {
      content: "";
      width: 100px;
      height: 150px;
      position: absolute;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      background-color: #f47983;
      transform: rotateZ(-92deg) translateX(-27px) translateY(-27px);
    }
  }
  .mes {
    color: white;
    font-size: 20px;
  }
}

@keyframes Heartbeat {
  0% {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.75);
  }
}
</style>
