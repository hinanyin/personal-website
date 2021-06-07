<template>
  <div class="recommend">
    <div class="content">
      <div class="music" v-for="(item, i) in recommendList" :key="i">
        <img src="../../assets/img/彩色星空.png" v-lazy="item.picUrl" alt />
        <div class="play iconfont icon-bofang1" @click="toDetail(item.id)"></div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "RecommendList",
  setup() {
    const state = reactive({
      recommendList: ""
    });

    const store = useStore();
    const router = useRouter();

    state.recommendList = computed(() => {
      return store.state.RecommentList;
    });

    let toDetail = id => {
      router.push({
        name: "ListDetail",
        params: {
          id
        }
      });
    };

    return {
      ...toRefs(state),
      toDetail
    };
  }
};
</script>

<style scoped lang="less">
.recommend {
  width: 100%;
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .music {
      width: 19%;
      height: 15%;
      margin: 0.5% 1%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        margin: 5px;
        border-radius: 15px;
        box-shadow: 0px 2px 5px 1px rgba(87, 145, 99, 0.7);
        opacity: 0.6;
        cursor: pointer;
      }
      .play {
        display: none;
        width: 50px;
        height: 50px;
        position: absolute;
        font-size: 50px;
        cursor: pointer;
        color: #003371;
      }
      .name {
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 45px;
        z-index: 2;
        color: #080808;
        display: none;
        border-radius: 15px 15px 5px 5px;
        background: rgba(219, 228, 221, 1);
        text-overflow: ellipsis;
        text-align: center;
      }
      img:hover {
        opacity: 1;
      }
      .play:hover {
        color: #c32136;
      }
    }
    .music:hover .play,
    .music:hover .name {
      display: block;
    }
  }
}

@media screen and (max-width: 600px) {
  .recommend {
    width: 100%;
    .content {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .music {
        width: 30%;
        height: 100px;
        margin: 25px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
          margin: 5px;
          border-radius: 5px;
          box-shadow: 0px 2px 5px 1px rgba(87, 145, 99, 0.5);
          opacity: 0.6;
        }
      }
      .music:hover .name {
        display: none;
      }
    }
  }
}
</style>
