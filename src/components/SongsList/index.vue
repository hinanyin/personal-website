<template>
  <div class="Song">
    <div class="content">
      <div class="songs" v-for="(item, i) in songsList" :key="i">
        <img src="../../assets/img/蓝紫色星空.png" v-lazy="item.picUrl" alt />
        <div class="iconfont icon-bofang1" @click="play(item.id)"></div>
        <div class="mes">
          <h5>{{ item.name }}</h5>
        </div>
      </div>
      <div class="player">
        <audio :src="musicUrl" autoplay controls></audio>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SongList",
  setup() {
    const state = reactive({
      songsList: "",
      musicUrl: ""
    });
    const store = useStore();
    state.songsList = computed(() => {
      return store.state.SongsList;
    });

    const play = id => {
      axios({
        method: "get",
        url: "https://autumnfish.cn//song/url",
        params: {
          id
        }
      }).then(res => {
        if (res.status == 200) {
          state.musicUrl = res.data.data[0].url;
        } else {
          console.log("请求失败");
        }
      });
    };

    return {
      ...toRefs(state),
      play
    };
  }
};
</script>

<style scoped lang="less">
.Song {
  width: 100%;
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    .songs {
      width: 40%;
      margin: 10px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #c2ccd0;
      box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      margin-bottom: 65px;
      img {
        width: 40%;
        height: 100%;
      }
      .iconfont {
        margin: 10px;
        width: 10%;
        font-size: 40px;
        cursor: pointer;
      }
      .iconfont:hover {
        color: #bf242a;
      }
      .mes {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: black;
        h5 {
          margin: 0 15px;
          text-align: center;
        }
      }
    }
    .player {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      border-radius: 5px;
      audio {
        width: 100%;
      }
    }
  }
}

@media screen and(max-width: 600px) {
  .Song {
    width: 100%;
    .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .songs {
        width: 65%;
        margin: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #c2ccd0;
        box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 40%;
          height: 100%;
        }
        .iconfont {
          margin: 10px;
          width: 10%;
          font-size: 40px;
          cursor: pointer;
        }
        .iconfont:hover {
          color: #bf242a;
        }
        .mes {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: black;
          h5 {
            margin: 0 15px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
