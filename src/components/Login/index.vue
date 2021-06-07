<template>
  <div class="login">
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 35%;
    height: 450px;
    margin: 45px;
    box-shadow: 1px 3px 5px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
