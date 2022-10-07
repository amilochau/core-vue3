import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { name: 'Home', path: '/:lang([a-z]{2})/', component: () => import('../pages/PageHome.vue') },
]

export default routes
