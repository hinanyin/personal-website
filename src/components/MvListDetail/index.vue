<template>
  <div class="mv">
    <div class="head">
      <i class="iconfont icon-fanhui4" @click="$router.back(1)"></i>
    </div>
    <div class="mvPlayer">
      <video :src="mvUrl" autoplay ref="video" loop></video>
    </div>
    <div class="player">
      <i class="play iconfont icon-zanting" @click="stop"></i>
      <i class="stop iconfont icon-bofang5" @click="play"></i>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "MvListDetail",
  setup() {
    const state = reactive({
      mvUrl: "",
      id: ""
    });
    const video = ref(null);
    const router = useRouter();
    state.id = router.currentRoute.value.params.id;

    onMounted(async () => {
      state.mvUrl = await getMvUrl(state.id);
    });
    const { play, stop } = PLAY(video);
    return {
      ...toRefs(state),
      video,
      play,
      stop
    };
  }
};
// 获取mv播放地址
const getMvUrl = async id => {
  let res = await axios({
    url: "https://autumnfish.cn/mv/url",
    method: "get",
    params: {
      id
    }
  });
  if (res.status == 200) {
    console.log(res);
    return res.data.data.url;
  } else {
    console.log("获取mv播放地址出错");
  }
};
// 播放事件
const PLAY = video => {
  const play = () => {
    video.value.pause();
  };
  const stop = () => {
    video.value.play();
  };

  return {
    play,
    stop
  };
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.mv {
  background-color: rgba(204, 40, 40, 0.1);
  width: 100%;
  height: 100vh;
  .head {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    background-color: #44cef6;
    .iconfont {
      margin-left: 25px;
      font-size: 26px;
      cursor: pointer;
    }
    .iconfont:hover {
      color: #db5a6b;
    }
  }
  .mvPlayer {
    margin-top: 25px;
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-self: center;
    video {
      width: 80%;
      height: 100%;
      @media screen and(max-width: 600px) {
        width: 100%;
      }
    }
  }
  .player {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 30px;
      margin: 10px;
      cursor: pointer;
    }
    i:hover {
      color: chartreuse;
    }
  }
}
</style>
