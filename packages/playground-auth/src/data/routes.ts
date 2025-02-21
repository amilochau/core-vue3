import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '', component: () => import('../pages/index.vue') },
  { name: 'HomeWithAuth', path: 'auth', meta: { requiresAuth: true }, component: () => import('../pages/index.vue') },
];

export default routes;
