import axios from 'axios';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import lazyLoading from './lazyLoading.js';

let util = {

};
util.title = function (title) {
    title = title || '一汽服贸DMS';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ?  '/src/data'
    : env === 'production'
        ? 'https://www.url.com'
        : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.forEach(item => {
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
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    //if (typeof item.title === 'object') {
        //return vm.$t(item.title.i18n);
    //} else {
        return item.title;
    //}
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
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
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
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
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
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
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
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
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
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
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.initRouter = function (vm) {
    const appRoutes = [];
    const menuList = [];
    // 404路由需要和动态路由一起注入
    // const page404 = {
    //     path: '/*',
    //     name: 'error-404',
    //     meta: {
    //         title: '404-页面不存在'
    //     },
    //     component: lazyLoading('error-page/404')
    // };
    // 模拟异步请求
    util.ajax('router.json').then(res => {
        var jsonRouter = res.data;
        localStorage.jsonRouter = JSON.stringify(jsonRouter);

        util.initRouterNode(appRoutes, jsonRouter);
        util.initRouterNode(menuList, jsonRouter);
        util.getPermissionName(jsonRouter);
        vm.$store.commit('updateMenuList', menuList.filter(item => item.children.length > 0));
        vm.$store.commit('updateRouters', appRoutes.filter(item => item.children.length > 0));
        
        vm.$router.push({
            name: 'home_index'
        });

        let tagsList = [];

        vm.$store.state.app.routers.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        vm.$store.commit('setTagsList', tagsList);
    });
};

// 生成路由节点
// util.initRouterNode = function (routers, data) {
//     for (var item of data) {
//         let addroute = Object.assign({}, item);
//         addroute.component = lazyLoading(addroute.component);
//         console.log(item.children)
//         if (item.children && item.children.length > 0) {
//             addroute.children = [];
//             util.initRouterNode(addroute.children, item.children);
//         }
//         let meta = {};
//         meta.isMenu = addroute.isMenu;
//         //delete addroute.isMenu;
//         addroute.meta = meta;
//         routers.push(addroute);
//     }
//     console.log(routers)
// };

util.initRouterNode = function (routers, data) {
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        if (item.path !== '') {
            let addroute = Object.assign({}, item);

            addroute.component = lazyLoading(addroute.component);
            if (item.children && item.children.length > 0) {
                addroute.children = [];
                util.initRouterNode(addroute.children, item.children);
            }
            routers.push(addroute);
        }
    }
};

util.getPermissionName = function (permission) {
    let permissionName = [];
    if (!permission) {
        return;
    }
    for (let i = 0; i < permission.length; i++) {
        let item = permission[i];
        if (item.children && item.children.length > 0) {
            for (let i = 0; i < item.children.length; i++) {
                if(item.children[i].isMenu !== 1){
                    permissionName.push(item.children[i].name);
                }
            }
        }
    }
    localStorage.permissionName =JSON.stringify(permissionName);
}

export default util;
