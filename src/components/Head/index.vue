<template>
  <div class="head">
    <div class="content">
      <ul>
        <li @click="routeJumb('/')" :class="{ active: name == '/' }">
          <i class="iconfont icon-fangzilengjiao"></i>
        </li>
        <li @click="routeJumb('music')" :class="{ active: name == 'music' }">
          <i class="iconfont icon-mmp"></i>
        </li>
        <li @click="routeJumb('about')" :class="{ active: name == 'about' }">
          <i class="iconfont icon-bangzhuguanyuwomen"></i>
        </li>
        <li
          @click="routeJumb('contact')"
          :class="{ active: name == 'contact' }"
        >
          <i class="iconfont icon-planetspacefl"></i>
        </li>
        <li @click="routeJumb('center')" :class="{ active: name == 'center' }">
          <i class="iconfont icon-gerenzhongxin"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Head",
  setup() {
    const state = reactive({
      name: "home"
    });
    const router = useRouter();

    let routeJumb = path => {
      router.push(path);
      state.name = path;
    };

    return {
      ...toRefs(state),
      routeJumb
    };
  }
};
</script>

<style scoped lang="less">
.active {
  background-color: #c32136;
  border-radius: 10px;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.head {
  width: 20%;
  height: 600px;
  display: flex;
  align-items: center;
  z-index: 5;
  .content {
    width: 100%;
    height: 550px;
    border-radius: 15px;
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    ul {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li {
        width: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        color: white;
        font-size: 20px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        cursor: pointer;
        margin: 5px 0px;
        i {
          font-size: 40px;
          margin: 10px;
          color: violet;
        }
      }
      li:hover {
        background-color: #c32136;
        color: black;
        box-shadow: 2px 3px 3px 0px rgba(121, 134, 141, 0.4);
        border-radius: 15px;
        box-sizing: border-box;
        border: 1px solid rgb(179, 165, 165);
      }
    }
  }
}

@media screen and(max-width: 600px) {
  .head {
    width: 100%;
    height: 70px;
    margin: 10px 1px 15px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: 90%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      ul {
        width: 95%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin: 0;
        li {
          flex: 1;
          height: 85%;
        }
      }
    }
  }
}
</style>
