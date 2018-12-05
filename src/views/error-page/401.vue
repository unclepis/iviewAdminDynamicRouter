<style lang="less">
    @import './401.less';
</style>

<template>
    <div class="error401">
        <div class="error401-body-con">
            <Card>
                <div class="error401-body-con-title">4
                    <span class="error401-0-span">
                        <Icon type="android-lock"></Icon>
                    </span>
                    <span class="error401-key-span">1</span>
                </div>
                <p class="error401-body-con-message">session失效，请重新登录！</p>
                <div class="error401-btn-con">
                    <!-- <Button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</Button> -->
                    <Button @click="backPage" size="large" style="width: 200px;" type="primary">返回登录页</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Error401',
        methods: {
            backPage() {
                // this.$router.go(-1);
                // 王天瑜 2018.05.02 退回登录页 清空相关数据
                this.$store.commit('logout', this);
                this.$store.commit('logoutClear');
                this.$router.push({
                    name: 'login'
                });
            },
            goHome() {
                this.$router.push({
                    name: 'home_index'
                });
            }
        }
    };
</script>
