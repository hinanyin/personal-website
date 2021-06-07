<template>
  <div class="listdetail">
    <div class="header iconfont icon-fanhui3" @click="$router.back(1)"></div>
    <div class="content">
      <div class="head">
        <img :src="songs.coverImgUrl" alt />
        <div class="des">
          <div class="name">{{ songs.name }}</div>
          <div class="description">{{ songs.description }}</div>
        </div>
      </div>
      <div class="songs">
        <ul>
          <li v-for="(item, i) in songs.tracks" :key="i">
            <img src="../../assets/img/蓝紫色星空.png" v-lazy="item.al.picUrl" alt />
            <i class="iconfont icon-icon-" @click="play(item.id, i)"></i>
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.ar[0].name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="player">
      <div class="Mname">{{ playIing }}</div>
      <i class="iconfont icon-Lastshangyiqu" @click="prev"></i>
      <i class="iconfont icon-weibiaoti--" @click="paused"></i>
      <i class="iconfont icon-Nextxiayiqu" @click="next"></i>
      <div class="Mname">{{ singerName }}</div>
      <audio :src="musicUrl" autoplay :muted="muted" ref="audio"></audio>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "ListDetail",
  setup() {
    const state = reactive({
      songs: "",
      id: "",
      musicUrl: "",
      muted: true,
      index: "",
      isStop: false,
      tracks: "",
      playIing: "",
      singerName: ""
    });
    const audio = ref(null);

    onBeforeMount(async () => {
      let { songs, tracks } = await getSongs(state.id);
      state.songs = await songs;
      state.tracks = await tracks;
    });
    // 获取歌曲播发url
    const play = async (id, index) => {
      state.index = index;
      const res = await axios({
        url: "https://autumnfish.cn//song/url",
        method: "get",
        params: {
          id
        }
      });
      if (res.status == 200) {
        state.musicUrl = res.data.data[0].url;
        state.muted = false;
        state.playIing = state.tracks[state.index].name;
        state.singerName = state.tracks[state.index].ar[0].name;
      }
    };
    const router = useRouter();
    state.id = router.currentRoute.value.params.id;
    const { prev, paused, next } = player(audio, state);
    return {
      ...toRefs(state),
      play,
      prev,
      paused,
      next,
      audio
    };
  }
};

// 获取歌单详情
const getSongs = async id => {
  let res = await axios({
    url: "https://autumnfish.cn/playlist/detail",
    method: "get",
    params: {
      id
    }
  });
  let songs = await res.data.playlist;
  let tracks = await res.data.playlist.tracks;
  return {
    songs,
    tracks
  };
};
// 获取音乐播放地址
const getUrl = async (id, state) => {
  const res = await axios({
    url: "https://autumnfish.cn//song/url",
    method: "get",
    params: {
      id
    }
  });
  if (res.status == 200) {
    state.musicUrl = res.data.data[0].url;
    state.muted = false;
  }
};
// 播放器事件
const player = (audio, state) => {
  // 上一曲
  let prev = async () => {
    if (state.index != 0) {
      let num = await --state.index;
      let PrevId = await state.songs.tracks[num].id;
      getUrl(PrevId, state);
      state.index = num;
      state.playIing = state.tracks[state.index].name;
      state.singerName = state.tracks[state.index].ar[0].name;
    } else {
      let num = await (state.songs.tracks.length - 1);
      let PrevId = await state.songs.tracks[num].id;
      getUrl(PrevId, state);
      state.index = num;
      state.playIing = state.tracks[state.index].name;
      state.singerName = state.tracks[state.index].ar[0].name;
    }
  };
  // 暂停与播放
  let paused = () => {
    state.isStop = !state.isStop;
    if (state.isStop == true) {
      audio.value.pause();
    } else {
      audio.value.play();
    }
  };
  // 下一曲
  let next = async () => {
    if (state.index != state.songs.tracks.length - 1) {
      let num = await ++state.index;
      let PrevId = await state.songs.tracks[num].id;
      getUrl(PrevId, state);
      state.index = num;
      state.playIing = state.tracks[state.index].name;
      state.singerName = state.tracks[state.index].ar[0].name;
    } else {
      let num = await 0;
      let PrevId = await state.songs.tracks[num].id;
      getUrl(PrevId, state);
      state.index = 0;
      state.playIing = state.tracks[state.index].name;
      state.singerName = state.tracks[state.index].ar[0].name;
    }
  };

  return {
    prev,
    paused,
    next
  };
};
</script>

<style scoped lang="less">
.listdetail {
  width: 100%;
  height: 610px;
  background: url("../../assets/img/boyyang.jpg");
  background-size: cover;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: scroll;
  .header {
    width: 3%;
    height: 45px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 35px;
    cursor: pointer;
  }
  .header:hover {
    color: tomato;
  }
  .content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 45px;
    .head {
      width: 100%;
      // height: 270px;
      margin: 15px;
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.6);
      img {
        width: 20%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .des {
      color: white;
      font-size: 20px;
      div {
        margin: 10px 30px;
      }
      .name {
        font-weight: bold;
      }
      .description {
        font-size: 16px;
      }
    }
    .songs {
      width: 100%;
      ul {
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 45%;
          margin: 10px;
          box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.6);
          display: flex;
          text-align: center;
          position: relative;
          img {
            width: 25%;
            border-radius: 4px;
          }
          .iconfont {
            width: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 35px;
            cursor: pointer;
          }
          .iconfont:hover {
            color: red;
          }
          .name {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            margin-left: 20px;
          }
          .singer {
            display: flex;
            justify-content: center;
            align-items: center;
            color: seashell;
            margin-left: 20px;
            color: springgreen;
          }
        }
      }
    }
  }
  .player {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 15px;
    .iconfont {
      font-size: 35px;
      margin: 5px 20px;
      cursor: pointer;
    }
    .iconfont:hover {
      color: brown;
    }
  }
}

@media screen and(max-width: 600px) {
  .listdetail {
    width: 100%;
    height: 670px;
    background: url("../../assets/img/boyyang.jpg");
    background-size: cover;
    background-position: center;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: scroll;
    .header {
      width: 3%;
      height: 45px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px 35px;
      cursor: pointer;
    }
    .header:hover {
      color: tomato;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .head {
        width: 100%;
        margin: 15px;
        display: flex;
        align-items: center;
        background: rgba(0, 0, 0, 0.6);
        img {
          width: 25%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .des {
        color: white;
        font-size: 20px;
        div {
          margin: 10px 30px;
        }
        .name {
          font-weight: bold;
          font-size: 16;
        }
        .description {
          font-size: 14px;
        }
      }
      .songs {
        width: 100%;
        ul {
          width: 100%;
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          li {
            width: 95%;
            // height: 150px;
            margin: 10px;
            box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.6);
            display: flex;
            text-align: center;
            position: relative;
            img {
              width: 25%;
              border-radius: 4px;
            }
            .iconfont {
              width: 10%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 35px;
              cursor: pointer;
            }
            .iconfont:hover {
              color: red;
            }
            .name {
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 12px;
              margin-left: 10px;
            }
            .singer {
              font-size: 13px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: seashell;
              margin-left: 10px;
              margin-right: 2px;
              color: springgreen;
            }
          }
        }
      }
    }
  }
}
</style>
