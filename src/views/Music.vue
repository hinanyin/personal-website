<template>
  <div class="music">
    <div class="back iconfont icon-cuowu11" @click="$router.push('/')"></div>
    <div class="content animated slideInDown">
      <keep-alive>
        <MusicHead />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MusicHead from "@/components/MusicHead";
// import Home from "@/views/Home";
export default {
  name: "Music",
  components: {
    MusicHead
    // Home
  }
};
</script>

<style scoped lang="less">
.music {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .back {
    font-size: 24px;
    margin: 10px;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
  .content {
    width: 99%;
    height: 90vh;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
  }
}
@media screen and(max-width: 600px) {
  .music {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    .content {
      width: 95%;
      height: 550px;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid white;
      border-radius: 10px;
      box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
