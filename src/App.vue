<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
@center: {
  display: flex;
  justify-content: center;
  align-items: center;
};

#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media screen and(max-width: 600px) {
  #app {
    width: 100%;
    min-height: 100%;
    background-position: center;
    background-size: cover;
    align-items: flex-start;
  }
}
</style>
