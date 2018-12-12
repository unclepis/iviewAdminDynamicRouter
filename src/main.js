import Vue from 'vue';
import iView from 'iview';
import i18n from '@/locale'
import { router } from './router/index';
import store from './store';
import App from './app.vue';
import util from '@/libs/util.js';
import BaiduMap from 'vue-baidu-map';
import hasPermission from '@/libs/hasPermission.js';
import 'iview/dist/styles/iview.css';
import $axios from '@/api/request.js';

Vue.prototype.$http = $axios; // 导入全局封装的axios
Vue.use(iView);
Vue.use(hasPermission);
Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'YOUR_APP_KEY'
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    mounted() {
        // 调用方法，动态生成路由
        util.initRouter(this);
    }
});
