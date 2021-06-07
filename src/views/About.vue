<template>
  <div class="about">
    <div class="back iconfont icon-cuowu11" @click="$router.push('/')"></div>
    <div class="content animated slideInLeft">
      <Resume />
    </div>
  </div>
</template>

<script>
import Resume from "@/components/Resume";
import { onMounted } from "vue";
export default {
  name: "About",
  components: {
    Resume
  },
  setup() {
    onMounted(() => {
      window.shortcuts.at("About");
      window.shortcuts.add(['ctrl', 's'], ctrls);
      window.shortcuts.add('tab', tab);
    });

    const tab = () => {
      console.log("Abouttab");
    };

    const ctrls = () => {
      console.log("Aboutctrls");
    };
  }
};
</script>

<style scoped lang="less">
.about {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
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
    width: 98vw;
    height: 90vh;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid white;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
    overflow-y: scroll;
  }
}

@media screen and(max-width: 600px) {
  .about {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    .content {
      width: 95%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      border: 1px solid white;
      border-radius: 10px;
      box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
