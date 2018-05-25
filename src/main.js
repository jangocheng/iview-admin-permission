import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import {otherRouter} from './router/router';
import store from './store';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import util from './libs/util';
import Cookies from 'js-cookie';
import hasPermission from './libs/hasPermission';

Vue.use(iView);
Vue.use(hasPermission);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        console.log(this.$store.state.app.pageOpenedList);
        this.currentPageName = this.$route.name;
        let appRoutes = [];
        let menuList = [];
        let tagsList = [];
        const jsonRouter = localStorage.jsonRouter ? JSON.parse(localStorage.jsonRouter) : null;
        if (Cookies.get('user') && jsonRouter) {
            util.initRouterNode(appRoutes, jsonRouter);
            util.initRouterNode(menuList, jsonRouter);
            appRoutes.map((item) => {
                if (item.children.length <= 1) {
                    tagsList.push(item.children[0]);
                } else {
                    tagsList.push(...item.children);
                }
            });
            this.$store.commit('updateMenuList', menuList.filter(item => item.children.length > 0));
            this.$store.commit('updateRouters', appRoutes.filter(item => item.children.length > 0));
            this.$store.commit('setOpenedList');
        
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
            this.$store.commit('initCachepage');
            this.$store.commit('setTagsList', tagsList)
        } else {
            this.$router.push({
                name: 'login'
            });
        }
    }
});
