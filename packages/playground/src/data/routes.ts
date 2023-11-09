import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '', component: () => import('../pages/PageHome.vue') },
  { name: 'Components', path: 'components', component: () => import('../pages/PageComponents.vue') },
]

export default routes
