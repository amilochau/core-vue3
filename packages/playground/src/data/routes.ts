import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '', component: () => import('../pages/PageHome.vue') },
  { name: 'Settings', path: 'settings', component: () => import('../pages/PageSettings.vue') },
]

export default routes
