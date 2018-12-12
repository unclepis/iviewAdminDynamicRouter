<style lang="less">
@import "./home.less";
</style>
<template>
  <div class="home-main">
    home page
    <DatePicker type="date" multiple placeholder="Select date" style="width: 300px"></DatePicker>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "home",
  data() {
    return {
    };
  },
  created() {
    var self = this;
    self.$http
      .get("/sys-users")
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
