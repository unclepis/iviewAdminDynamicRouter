<style lang="less">
    @import "./home.less";
</style>
<template>
    <div class="home-main">
        home page
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'home',
    data () {
        return {
            //
        };
    },
    created () {
        axios.get('http://172.21.46.17:8080/article/1')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};
</script>
