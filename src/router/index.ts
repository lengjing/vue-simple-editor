import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Site',
    component: () => import('../views/Site'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
