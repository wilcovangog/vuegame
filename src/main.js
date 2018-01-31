import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import store from './store';
import 'src/config/http';
import routes from 'src/routes';
import 'src/style.scss';

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
});

new Vue({
  router,
  store,
}).$mount('#app');
