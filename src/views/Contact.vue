<template>
  <div class="contact">
    <div class="back iconfont icon-cuowu11" @click="$router.push('/')"></div>
    <div class="content animated rotateInDownLeft">
      <ContactDetail />
    </div>
  </div>
</template>

<script>
import ContactDetail from "@/components/ContactDetail";
export default {
  name: "Contact",
  components: {
    ContactDetail
  }
};
</script>

<style scoped lang="less">
.contact {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .back {
    font-size: 24px;
    cursor: pointer;
    margin: 10px;
    &:hover {
      color: red;
    }
  }
  .content {
    width: 98vw;
    height: 90vh;
    background: rgba(0, 0, 0, 0.5);
    // border: 1px solid white;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

@media screen and(max-width: 600px) {
  .contact {
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
