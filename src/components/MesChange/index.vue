<template>
  <div class="meschange" @click="isShow = false">
    <div class="mes">
      <div class="exit">
        <i class="iconfont icon-cuowu1"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "MesChange",
  setup() {
    const state = reactive({
      isShow: true
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>

<style scoped lang="less">
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};
@end: {
  display: flex;
  justify-content: flex-end;
  align-items: center;
};
.meschange {
  width: 25%;
  height: calc(100% - 60px);
  background-color: rgb(97, 52, 52);
  border-radius: 10px;
  @center();
  .mes {
    width: 45%;
    height: 70%;
    margin-top: 25px;
    border-radius: 4px;
    background: rgb(235, 226, 226);
    box-shadow: 2px 3px 3px 0 rgba(0, 0, 0, 0.5);
    .exit {
      width: 100%;
      @end();
      .iconfont {
        font-size: 34px;
        color: #050505;
        margin: 5px;
        cursor: pointer;
        &:hover {
          color: rgb(194, 83, 83);
        }
      }
    }
  }
}
</style>
