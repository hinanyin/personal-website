<template>
  <div class="Mv">
    <div class="content">
      <div class="mv" v-for="(item, i) in mvList" :key="i">
        <img src="../../assets/img/湖边星空.png" v-lazy="item.cover" alt />
        <h5>{{ item.name }}</h5>
        <div class="iconfont icon-mv1" @click="mvPlay(item.id)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "MvList",
  setup() {
    const state = reactive({
      mvList: ""
    });
    const store = useStore();
    const router = useRouter();
    state.mvList = computed(() => {
      return store.state.MvList;
    });
    const mvPlay = id => {
      router.push({
        name: "MvListDetail",
        params: {
          id
        }
      });
    };
    return {
      ...toRefs(state),
      mvPlay
    };
  }
};
</script>

<style scoped lang="less">
.Mv {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    .mv {
      width: 25%;
      height: 35%;
      margin: 1% 2%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
      border: 2px solid white;
      flex-wrap: wrap;
      position: relative;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        border-radius: 3px;
      }
      h5 {
        width: 100%;
        margin: 5px 0;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        color: black;
        background-color: rgb(23, 161, 53);
      }
      .iconfont {
        position: absolute;
        font-size: 35px;
        cursor: pointer;
      }
      .iconfont:hover {
        color: red;
      }
    }
  }
}

@media screen and(max-width: 600px) {
  .Mv {
    width: 100%;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      align-items: center;
      .mv {
        width: 65%;
        height: 150px;
        margin: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        img {
          width: 100%;
          border: 2px solid whitesmoke;
        }
        h5 {
          margin: 0;
          padding: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
