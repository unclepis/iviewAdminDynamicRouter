<style lang="less">
@import "./home.less";
</style>
<template>
  <div class="home-main">
    <baidu-map></baidu-map>
  </div>
</template>

<script>
import baiduMap from "./components/baiduMap.vue";
export default {
  name: "home",
  components: {
    baiduMap
  },
  data() {
    return {};
  },
  created() {}
};
</script>
