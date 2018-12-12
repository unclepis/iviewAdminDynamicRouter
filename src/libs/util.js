import axios from 'axios';
import env from '../../build/env';
import lazyLoading from './lazyLoading.js';
import ParentView from '@/views/parentView.vue';
import Main from '@/views/Main.vue';
let util = {

};
util.title = function (title) {
    title = title || '徐工集团';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? '/src/data'
    : env === 'production'
        ? 'http://172.21.46.17:8080/login'
        : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === "object") {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
    // return item.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.name === name && item.isCustom) {
            title = util.handleTitle(vm, item);
            if (item.name === 'otherRouter') {
                isOtherRouter = true;
            }
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = util.handleTitle(vm, item);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            } else {
                item.children.forEach(child => {
                    if (child.name === name) {
                        title = util.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        }
    });
    let currentPathArr = [];
    //去首页
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    }
    //去导航菜单一级页面或者OtherRouter路由中的页面
    else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    }
    //去导航菜单二级页面或三级页面
    else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {

            var hasMenu;
            if (item.name === name && item.isCustom) {
                hasMenu = true;
                return hasMenu;
            } else if (item.children.length < 1) {
                hasMenu = item.children[0].name === name;
                return hasMenu;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    //如果是三级页面按钮，则在二级按钮数组中找不到这个按钮名称
                    //需要二级页面下可能出现三级子菜单的情况逻辑加入
                    if (childArr[i].name === name) {
                        hasMenu = true;
                        return hasMenu;
                    }
                    i++;
                }
                //如果一级，二级菜单下都没有此按钮名称，则遍历三级菜单
                if (!hasMenu) {
                    for (let m = 0; m < childArr.length; m++) {
                        if (!childArr[m].children) continue;
                        let sonArr = childArr[m].children;
                        for (let n = 0; n < sonArr.length; n++) {
                            if (sonArr[n].name === name) {
                                hasMenu = true;
                                return hasMenu;
                            }
                        }
                    }
                }
                return false;
            }
        })[0];
        if (currentPathObj && currentPathObj.isCustom) {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: currentPathObj.path,
                    name: currentPathObj.name
                },
            ];
        }
        else if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        }
        else {
            //如果是三级页面按钮，则在二级按钮数组中找不到这个按钮名称
            //需要二级页面下可能出现三级子菜单的情况逻辑加入
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];

            // let thirdLevelObj =
            console.log(childObj)
            //二级页面
            if (childObj) {
                currentPathArr = [
                    {
                        title: '首页',
                        path: '/home',
                        name: 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: currentPathObj.name
                    },
                    {
                        title: childObj.title,
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }
            //childobj为undefined，再从三级页面中遍历
            else {
                let thirdObj;
                let childObj = currentPathObj.children.filter((child) => {
                    let hasChildren;
                    hasChildren = child.name === name;
                    if (hasChildren) return hasChildren

                    if (child.children) {
                        let sonArr = child.children;
                        for (let n = 0; n < sonArr.length; n++) {
                            if (sonArr[n].name === name) {
                                thirdObj = sonArr[n];
                                hasChildren = true;
                                return hasChildren;
                            }
                        }
                    }
                    return hasChildren
                })[0];

                if (thirdObj && childObj) {
                    currentPathArr = [
                        {
                            title: '首页',
                            path: '/home',
                            name: 'home_index'
                        },
                        {
                            title: currentPathObj.title,
                            path: '',
                            name: currentPathObj.name
                        },
                        {
                            title: childObj.title,
                            path: '',    //设为空是因为此二级菜单没有实际页面且用于面包屑组件显示，path为空的将不可单击
                            name: childObj.name
                        },
                        {
                            title: thirdObj.title,
                            path: currentPathObj.path + '/' + childObj.path + '/' + thirdObj.path,
                            name: thirdObj.name
                        }
                    ];
                }

            }

        }
    }

    vm.$store.commit('setCurrentPath', currentPathArr);
    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    if (vm.$store === undefined) {
        return;
    }
    let pageOpenedList = vm.$store.state.app.pageOpenedList;

    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }

    if (!tagHasOpened) {
        let tag = [];
        for (var l = 0; l < vm.$store.state.app.tagsList.length; l++) {
            var item = vm.$store.state.app.tagsList[l];
            if (item.isCustom) {
                if (name === item.name) {
                    tag = item;
                    break;
                }
            } else {
                if (item.children && item.children.length > 0) {
                    for (var j = 0; j < item.children.length; j++) {
                        if (name == item.children[j].name) {
                            tag = item.children[j];
                            break;
                        }
                        for (var k = 0; k < item.children[j].length; k++) {
                            if (name == item.children[j][k].name) {
                                tag = item.children[j][k];
                                break;
                            }
                        }
                    }
                } else {
                    if (name === item.name) {
                        tag = item;
                        break;
                    }
                }
            }

        }
        if (tag && tag.component) {
            tag = tag.children && tag.children.length > 0 ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            console.log(tag);
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};
util.initRouter = function (vm) {
    const constRoutes = [];
    const otherRoutes = [];

    // 404路由需要和动态路由一起注入
    const otherRouter = [{
        path: '/*',
        name: 'error-404',
        title: '404-页面不存在',
        component: 'error-page/404'
    }];
    // 模拟异步请求
    util.ajax('mock.json').then(res => {
        var menuData = res.data;
        util.initRouterNode(constRoutes, menuData);
        util.initRouterNode(otherRoutes, otherRouter);
        // 添加主界面路由
        vm.$store.commit('updateAppRouter', constRoutes.filter(item => item.children.length > 0));
        // 添加全局路由
        vm.$store.commit('updateDefaultRouter', otherRoutes);
        // 刷新界面菜单
        vm.$store.commit('updateMenulist', constRoutes.filter(item => item.children.length > 0));

        let tagsList = [];

        vm.$store.state.app.routers.map((item) => {
            if (item.isCustom) {
                tagsList.push(item);
            } else if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        vm.$store.commit('setTagsList', tagsList);
    });
};

// 生成路由节点
util.initRouterNode = function (routers, data) {
    for (var item of data) {
        let menu = Object.assign({}, item);
        if (menu.component) {
            if (menu.component === "Main") {
                menu.component = Main;
            } else if (menu.component === "ParentView") {
                menu.component = ParentView;
            } else {
                menu.component = lazyLoading(menu.component);
            }
        }

        if (item.children && item.children.length > 0) {
            menu.children = [];
            util.initRouterNode(menu.children, item.children);
        }
        // let meta = {};
        // // 给页面添加标题
        // meta.permission = menu.permission ? menu.permission : null;
        // meta.title = menu.title ? menu.title : null;

        // menu.meta = meta;

        routers.push(menu);
    }
};

export default util;
