<style lang="less">
@import "./home.less";
</style>
<template>
<div class="home-main">
    home page
</div>
</template>

<script>
import Cookies from "js-cookie";
export default {
    name: "home",
    data() {
        return {
            //
            token: Cookies.get("token")
        };
    },
    created() {
        var self = this;
        // self.$http
        //     .get("/api/menuList", {
        //         headers: {
        //             Authorization: "Bearer " + self.token
        //         }
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
};
</script>
