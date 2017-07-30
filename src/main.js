// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' //引入路由
import store from './store' //引入vuex 状态管理

import vueTap from 'v-tap';
import fastclick from 'fastclick';

Vue.use(vueTap); //解决300ms的延迟

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
