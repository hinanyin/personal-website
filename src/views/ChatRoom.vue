<template>
  <div class="myshows">
    <div class="header">
      <div class="iconfont icon-fanhui1" @click="$router.back(1)"></div>
    </div>
    <div class="content">
      <div class="box">功能还在完善中---</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
  name: "ChatRoom",
  setup() {
    const state = reactive({
      myf: ref(null),
      imgurl: [
        require("../assets/img/mafia动漫5k壁纸_彼岸图网.jpg"),
        require("../assets/img/photo3.jpg")
      ]
    });

    return {
      ...toRefs(state)
    };

    // var ws = new WebSocket("ws://localhost:3000");
    // ws.onopen = function(evt) {
    //   console.log(evt);
    //   console.log("Connection open ...");
    //   ws.send("Hello WebSockets!");
    // };
    // ws.onmessage = function(evt) {
    //   console.log("Received Message: " + evt.data);
    //   ws.close();
    // };
    // ws.onclose = function(evt) {
    //   console.log("Connection closed.");
    //   console.log(evt);
    // };
  }
};
</script>

<style scoped lang="less">
@center: {
  display: flex;
  align-items: center;
  justify-content: center;
};
@left : {
  display: flex;
  align-items: center;
};
.myshows {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: red;
  background-size: cover;
  background-position: center;
  background-image: url("../assets/img/boyyang.jpg");
  overflow-y: scroll;
  .header {
    width: 100%;
    height: 45px;
    position: sticky;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    @left();
    z-index: 5;
    .iconfont {
      font-size: 30px;
      color: cadetblue;
      cursor: pointer;
      margin-left: 15px;
    }
    .iconfont:hover {
      color: pink;
    }
  }
  .content {
    width: 100%;
    height: 580px;
    background-color: black;
    @center();
    .box {
      width: 50%;
      height: 70%;
      background-color: #fff;
      perspective: 800;
      .img {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        position: relative;
      }
    }
  }
}

@media screen and(max-width: 600px) {
  .myshows {
    width: 100%;
    height: 675px;
    overflow-y: scroll;
  }
}
</style>
