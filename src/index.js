import Vue from 'vue';
import VueRouter from 'vue-router';
import InstantSearch from 'vue-instantsearch';
import App from './App.vue';
import Watch from './Watch.vue';
import Search from './Search.vue';
import qs from 'qs';

Vue.use(InstantSearch);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'search', path: '/search', component: Search, props: route => ({ queryParameters: route.query }) },
    { name: 'watch', path: '/video/:id', component: Watch, props: true },
    { path: '/', redirect: '/search' }
  ],
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    const result = qs.stringify(query);

    return result ? `?${result}` : '';
  },
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
