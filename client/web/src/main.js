import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls'
import 'lib-flexible/flexible'
// import 'view-design/dist/styles/iview.css'
import VueLazyLoad from 'vue-lazyload'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'core-js'

// import ViewUI from 'view-design'
// Vue.use(ViewUI)

// eslint-disable-next-line
const vue = Vue;

Vue.use(VueLazyLoad, {
  error: require('./assets/images/logo.png'),
  loading: require('./assets/images/logo.png')
})

Vue.use(mavonEditor)

// Vue.prototype.$Message = Message
Vue.config.productionTip = false

Vue.use(Storage, {
  namespace: 'cloudy__',
  name: 'ls',
  storage: 'local'
})

router.beforeEach(async (to, from, next) => {
  store.commit('headers/SET_NAV_INDEX', to.meta.navIndex)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
