import Vue from 'vue'
import VueRouter from 'vue-router';
import Routers from './router'
import Util from './libs/util'
import App from './app.vue';
import store from './store'
import {sync} from 'vuex-router-sync'
import VueLocalStorage from 'vue-ls';
import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import './assets/style/admin.css';
import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(mavonEditor);

Vue.use(VueLocalStorage, {
  namespace: 'cloudy-',
  storage: 'session'
});

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
};

const router = new VueRouter(RouterConfig);


router.beforeEach(async (to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title)

  let token = Vue.ls.get("token");
  if (token) {
    if (!store.state.admin.adminAuth) { store.dispatch('admin/auth') }
    next()

  } else {
    // 判断是否需要登录
    if (!!to.meta.noAuth) {
      next()

    } else {
      Vue.prototype.$Message.error('权限未授权')
      setTimeout(() => {
        next('/login')
      }, 1500)
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

Vue.prototype.$isDev = process.env.NODE_ENV === 'development'
Vue.prototype.$bsaeSrc = 'http://cdn.majh.top/' // 七牛云图片前缀

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
