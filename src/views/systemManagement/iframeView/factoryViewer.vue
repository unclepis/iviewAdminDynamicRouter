<style>
html,
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<template>
  <iframe
    id="dvframe"
    :src="address"
    width="100%"
    height="100%"
    frameborder=0
    seamless
  />
</template>
<script>
export default {
  data() {
    return {
      address:'http://unclepis.coding.me/unclepisBlogDeploy'
    };
  },
  methods: {
  
  },
  mounted: function() {
    const iframeDom = document.getElementById("dvframe");
    iframeDom.onload = function(e) {
      console.log(e);
    };
  }
};
</script>
