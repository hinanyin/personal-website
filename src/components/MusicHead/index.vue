<template>
  <div class="musichead">
    <div class="content">
      <ul>
        <li :class="{ active: flog == '推荐歌单' }" @click="tabChange('推荐歌单')">推荐歌单</li>
        <li :class="{ active: flog == '推荐MV' }" @click="tabChange('推荐MV')">推荐MV</li>
        <li :class="{ active: flog == '推荐单曲' }" @click="tabChange('推荐单曲')">推荐单曲</li>
      </ul>
    </div>
    <div class="recomment" v-show="flog == '推荐歌单'">
      <keep-alive>
        <RecommentList />
      </keep-alive>
    </div>
    <div class="recomment" v-show="flog == '推荐MV'">
      <keep-alive>
        <MvList />
      </keep-alive>
    </div>
    <div class="recomment" v-show="flog == '推荐单曲'">
      <keep-alive>
        <SongsList />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import RecommentList from "@/components/RecommentList";
import MvList from "@/components/MvList";
import SongsList from "@/components/SongsList";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  name: "MusicHead",
  components: {
    RecommentList,
    MvList,
    SongsList
  },
  setup() {
    const state = reactive({
      flog: "推荐歌单",
      url: "https://autumnfish.cn/personalized",
      recommendList: [],
      mvList: [],
      songsList: []
    });

    const store = useStore();
    // tab切换并且获取该页面数据
    let tabChange = async str => {
      state.flog = str;
      if (state.flog == "推荐歌单") {
        state.url = "https://autumnfish.cn/personalized";
        let res = await getMusic(state);
        state.recommendList = res.data.result;
        store.state.RecommentList = state.recommendList;
      }
      if (state.flog == "推荐MV") {
        state.url = "https://autumnfish.cn/mv/first";
        let res = await getMusic(state);
        state.mvList = res.data.data;
        store.state.MvList = state.mvList;
      }
      if (state.flog == "推荐单曲") {
        state.url = "https://autumnfish.cn/personalized/newsong";
        let res = await getMusic(state);
        state.songsList = await res.data.result;
        store.state.SongsList = await state.songsList;
      }
    };
    // 组件加载就获取推荐歌单数据
    onMounted(async () => {
      let res = await getMusic(state);
      state.recommendList = res.data.result;
      store.state.RecommentList = state.recommendList;
      window.shortcuts.at("MusicHead");
      window.shortcuts.add(['ctrl', 's'], ctrls);
      window.shortcuts.add('tab', tab);
    });

    const tab = () => {
      tabChange('推荐MV');
    };

    const ctrls = () => {
      console.log("MusicHeadctrls");
    };
    return {
      ...toRefs(state),
      tabChange
    };
  }
};

// 异步获取数据
const getMusic = async state => {
  let res = await axios({
    url: state.url,
    method: "get"
  });

  if (res.status == 200) {
    return res;
  } else {
    console.log("数据请求失败");
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.active {
  background-color: #be002f;
  color: whitesmoke;
}
.musichead {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 90%;
    height: 40px;
    margin-top: 5px;
    border-radius: 5px;
    background: rgba(221, 225, 226, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        height: 95%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 4px;
        margin: 2px;
      }
      li:hover {
        background-color: #1bd1a5;
        color: whitesmoke;
      }
    }
  }
  .recomment {
    color: white;
    overflow-y: scroll;
  }
}
</style>
