<template>
  <div v-show="dialogVisible" class="divdd">
    <span>这是一段信息</span>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  name: "testModal",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    onMounted(() => {
      window.shortcuts.at("testModal");
      window.shortcuts.add('tab', tab);
      window.shortcuts.add('esc', () => {
        window.shortcuts.back();
        this.$emit("close");
      });
    });
    const tab = () => {
      console.log("tab");
    };
  }
};
</script>

<style scoped lang="less">
.divdd {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
