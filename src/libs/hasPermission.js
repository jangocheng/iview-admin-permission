import util from './util';
const hasPermission = {
    install (Vue, options) {
        Vue.directive('hasPermission', {
            bind (el, binding, vnode) {
                let name = JSON.parse(localStorage.permissionName);
                util.getPermissionName();
                if (name && !name.includes(binding.value)) {
                    el.parentNode.removeChild(el);
                }
            }
        });
    }
};

export default hasPermission;