import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    title: 'Login - 登录',
    component: () => import('@/views/login.vue')
};

export const page401 = {
    path: '/401',
    title: '401-session失效',
    name: 'error-401',
    component: () => import('@/views/error-page/401.vue')
};

export const page403 = {
    path: '/403',
    title: '403-权限不足',
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    title: '500-服务端错误',
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const pageNoNetwork = {
    path: '/noNetwork',
    title: '网络未连接',
    name: 'no-network-page',
    component: () => import('@/views/error-page/no-network-page.vue')
};


// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...appRouter,
    page401,
    page403,
    page500,
    pageNoNetwork,
];
