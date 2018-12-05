<style lang="less">
    @import './no-network-page.less';
</style>

<template>
    <div class="error401">
        <div class="error401-body-con">
            <Card>
                <!-- <div class="error401-body-con-title">4
                    <span class="error401-0-span">
                        <Icon type="android-lock"></Icon>
                    </span>
                    <span class="error401-key-span">1</span>
                </div> -->
                <div class="error401-body-con-div">
                    <p class="div-message">请检查网络！</p>
                    <p class="div-title">请尝试以下方法：</p>
                    <ul class="div-ul">
                        <li>检查网线、调制解调器和路由器</li>
                        <li>重新连接到 Wi-Fi 网络</li>
                    </ul>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'no-network-page',
        methods: {
        }
    };
</script>
